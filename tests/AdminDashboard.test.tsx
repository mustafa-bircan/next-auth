import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import AdminDashboard from '@/app/admin/dashboard/page';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@/src/context/ThemeContext';

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
});

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
    Bar: () => <div data-testid="mock-bar" />,
}));


describe('AdminDashboard', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn().mockResolvedValue(undefined),
            pathname: '/admin/dashboard',
            query: {},
            asPath: '/admin/dashboard',
        });
    });

    const renderWithProviders = () =>
        render(
            <SessionProvider
                session={{
                    user: {
                        name: 'Admin Mustafa',
                        email: 'admin@example.com',
                        role: 'admin',
                    },
                    expires: '2030-01-01T00:00:00.000Z',
                }}
            >
                <ThemeProvider>
                    <AdminDashboard />
                </ThemeProvider>
            </SessionProvider>
        );

    it('Admin karşılama başlığını render eder', () => {
        renderWithProviders();
        const heading = screen.getByText(/hoş geldin, admin mustafa/i);
        expect(heading).toBeInTheDocument();
    });

    it('Toplam Kullanıcı kartını doğru şekilde gösterir', () => {
        renderWithProviders();
        const title = screen.getByText(/toplam kullanıcı/i);
        const number = screen.getByText("1234");
        expect(title).toBeInTheDocument();
        expect(number).toBeInTheDocument();
    });

    it('Role filtreleme kullanıcıları doğru şekilde filtreler', async () => {
        renderWithProviders();

        const roleSelect = screen.getByLabelText('Rol filtrele');
        fireEvent.change(roleSelect, { target: { value: 'admin' } });

        await waitFor(() => {
            expect(screen.queryByText('Ahmet Yılmaz')).not.toBeInTheDocument();
            expect(screen.getByText('Mehmet Demir')).toBeInTheDocument();
        });
    });

    it('Arama kutusu isimlere göre filtreleme yapar', async () => {
        renderWithProviders();

        const searchInput = screen.getByLabelText('Kullanıcı ara');
        fireEvent.change(searchInput, { target: { value: 'fatma' } });

        await waitFor(() => {
            expect(screen.getByText('Fatma Öztürk')).toBeInTheDocument();
            expect(screen.queryByText('Ahmet Yılmaz')).not.toBeInTheDocument();
        });
    });

    it('Kullanıcı rolü değiştiğinde alert gösterilir', async () => {
        window.alert = jest.fn();
        renderWithProviders();

        const row = screen.getByText('Ahmet Yılmaz').closest('tr');
        expect(row).toBeTruthy();

        const select = within(row!).getByRole('combobox');

        fireEvent.change(select, { target: { value: 'admin' } });

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith(
                expect.stringContaining("rolü 'admin' olarak güncellendi")
            );
        });
    });
});
