import UserHomePage from '@/app/user/home/page';
import { ThemeProvider } from '@/src/context/ThemeContext';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import fetch from 'cross-fetch';
import { signOut } from 'next-auth/react';

process.env.NEXTAUTH_URL = 'http://localhost:3000';


beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    (global as any).fetch = fetch;
});

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => {
    const originalModule = jest.requireActual('next-auth/react');
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(),
        signOut: jest.fn(),
    };
});


describe('UserHomePage', () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });
        pushMock.mockClear();
        (useSession as jest.Mock).mockReset();
    });

    const renderWithSession = (sessionData: any, status: 'authenticated' | 'unauthenticated' | 'loading' = 'authenticated') => {
        (useSession as jest.Mock).mockReturnValue({
            data: sessionData,
            status: status,
        });

        render(
            <SessionProvider session={sessionData}>
                <ThemeProvider>
                    <UserHomePage />
                </ThemeProvider>
            </SessionProvider>
        );
    };

    it('Yükleniyor mesajını gösterirken', () => {
        renderWithSession(null, 'loading');
        expect(screen.getByText(/yükleniyor/i)).toBeInTheDocument();
    });

    it('Oturum yoksa login sayfasına yönlendirir', () => {
        renderWithSession(null, 'unauthenticated');
        expect(pushMock).toHaveBeenCalledWith('/login');
    });

    it('Rolü user olmayan oturumda anasayfaya yönlendirir', () => {
        const session = {
            user: {
                name: 'Admin Mustafa',
                role: 'admin',
                email: 'admin@example.com',
            },
            expires: '2030-01-01T00:00:00.000Z',
        };
        renderWithSession(session, 'authenticated');
        expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('Doğru kullanıcı ve selamlamayı gösterir', () => {
        const session = {
            user: {
                name: 'user',
                role: 'user',
                email: 'user@example.com',
            },
            expires: '2030-01-01T00:00:00.000Z',
        };

        renderWithSession(session, 'authenticated');

        const matches = screen.getAllByText(/user/i);
        expect(matches.length).toBeGreaterThanOrEqual(1);

        const greeting = screen.getByRole('heading', {
            name: /(Günaydın|İyi\s*günler|iyi\s*akşamlar).*user.*👋/i,
        });

        expect(greeting).toBeInTheDocument();
    });



    it('Bildirimleri listeler', () => {
        const session = {
            user: {
                name: 'Fatma Öztürk',
                role: 'user',
                email: 'fatma@example.com',
            },
            expires: '2030-01-01T00:00:00.000Z',
        };
        renderWithSession(session, 'authenticated');

        expect(screen.getByText(/abonelik yenilemeniz/i)).toBeInTheDocument();
        expect(screen.getByText(/yeni özellikler/i)).toBeInTheDocument();
    });

    it('Tema değiştirme butonu çalışır', () => {
        const session = {
            user: {
                name: 'Fatma Öztürk',
                role: 'user',
                email: 'fatma@example.com',
            },
            expires: '2030-01-01T00:00:00.000Z',
        };
        renderWithSession(session, 'authenticated');

        const buttons = screen.getAllByRole('button', { name: /toggle theme/i });
        expect(buttons.length).toBeGreaterThan(0);

        fireEvent.click(buttons[0]);
    });

    it('Logout fonksiyonunu tetikler', async () => {
        const session = {
            user: {
                name: 'Fatma Öztürk',
                role: 'user',
                email: 'fatma@example.com',
            },
            expires: '2030-01-01T00:00:00.000Z',
        };

        renderWithSession(session, 'authenticated');

        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

        const logoutButton = screen.getByText(/çıkış yap/i);
        fireEvent.click(logoutButton);

        await waitFor(() => {
            expect(signOut).toHaveBeenCalledWith({
                redirect: false,
                callbackUrl: '/login',
            });
        });

        alertMock.mockRestore();
    });


});
