import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { constructMetadata } from "@/seo/metadata";

export const metadata = constructMetadata({
  title: "Contact AIZONET | Get Your Free AI Marketing Consultation",
  description: "Connect with Raipur's top AI marketing agency. Start your journey towards 10x growth today.",
});

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Column: Info */}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                  Let's Build the <span className="text-gradient">Future</span> Together
                </h1>
                <p className="text-xl text-white/60 mb-12">
                  Ready to transform your business with AI? Our team in Raipur is here to 
                  help you navigate the new era of digital marketing.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Our Headquarters</h3>
                      <p className="text-white/60">Civil Lines, Raipur<br />Chhattisgarh, India 492001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Call Us</h3>
                      <p className="text-white/60">+91-XXXXXXXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Email Us</h3>
                      <p className="text-white/60">hello@aizonet.in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-zinc-950/50 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
