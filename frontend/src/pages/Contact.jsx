const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 mt-10 mb-10 bg-white rounded-xl shadow">
            <h1 className="text-3xl font-heading text-center mb-8 text-[#ff9d00]">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-[#ff9d00]">Get in Touch</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            <strong>Address:</strong><br />
                            123 Fashion Street<br />
                            Mumbai, Maharashtra 400001<br />
                            India
                        </p>
                        <p>
                            <strong>Phone:</strong><br />
                            +91 98765 43210
                        </p>
                        <p>
                            <strong>Email:</strong><br />
                            support@uurja.com
                        </p>
                        <p>
                            <strong>Business Hours:</strong><br />
                            Monday - Saturday: 10:00 AM - 8:00 PM<br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-[#ff9d00]">Send us a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                placeholder="Subject"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#ff9d00] text-white py-2 px-4 rounded-md hover:bg-[#b8942a] transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;