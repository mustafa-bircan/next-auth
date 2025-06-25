"use client";

export default function DemoVideoSection() {
    return (
        <section className="py-20 bg-indigo-800 bg-opacity-80 text-white text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-6">Canlı Demo</h2>
                <p className="mb-8 max-w-xl mx-auto text-indigo-200">
                    Sistemimizin gücünü canlı demo videomuzla keşfedin.
                </p>
                <div className="aspect-video max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
