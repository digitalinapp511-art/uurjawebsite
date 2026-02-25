const NewsletterSection = () => {
    return (
        <section className="py-12 bg-[#383737] relative">

            <div className="max-w-6xl mx-auto px-6 text-center text-white">

                <h2 className="font-heading text-3xl md:text-4xl mb-4 text-[#ff9d00]">
                    Join Our Inner Circle
                </h2>
                <p className="text-[#ff9d00] max-w-xl mx-auto mb-8 font-semibold">
                    Be the first to receive exclusive offers, New launches,
                    and premium ethnic fashion updates.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // API integration ready
                }}
                    className="flex flex-col-2 sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                    <input type="email" required placeholder="Enter your email address"
                        className="w-full px-5 py-2 md:px-5 md:py-4 border-2 rounded-full text-gray-900 outline-bone" />

                    <button type="submit" className="bg-[#ff9d00] px-4 py-2 md:px-8 md:py-4 rounded-full font-semibold hover:bg-[#a8326d] 
                    hover:shadow-[0_0_25px_rgba(245,240,206,0.25)] hover:text-[#d4af37] transition shadow-lg">
                        Subscribe
                    </button>
                </form>

                <p className="text-xs text-white/50 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                </p>

            </div>
        </section>
    );
};

export default NewsletterSection;
