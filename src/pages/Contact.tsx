
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPaw,
} from "react-icons/fa";

import {
  FiClock,
  FiHeadphones,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetContactQuery } from "@/redux/features/contact/contactApi";


const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     GET CONTACT INFORMATION FROM BACKEND
  ========================================================= */

  const {
    data: contactResponse,
    isLoading: isContactLoading,
    isError: isContactError,
  } = useGetContactQuery();

  const contact = contactResponse?.data;

  /* =========================================================
     CONTACT INFO
  ========================================================= */

  const contactInfo = [
    {
      icon: FiPhone,
      title: "Call Us",
      value: contact?.phone || "Phone unavailable",
      description: contact?.businessHours?.mondayFriday
        ? `Mon – Fri, ${contact.businessHours.mondayFriday}`
        : "Business hours unavailable",
    },
    {
      icon: FiMail,
      title: "Email Us",
      value: contact?.email || "Email unavailable",
      description: "We usually reply within 24 hours.",
    },
    {
      icon: FiMessageCircle,
      title: "Customer Support",
      value: "We're here to help",
      description:
        "Questions about orders, sizing or products?",
    },
  ];

  /* =========================================================
     SUPPORT ITEMS
  ========================================================= */

  const supportItems = [
    {
      icon: FiShoppingBag,
      title: "Order Support",
      description:
        "Need help with an order? Our customer care team is ready to help with your purchase.",
    },
    {
      icon: FiShield,
      title: "Returns & Exchanges",
      description:
        "Not the right fit? Contact our team and we'll guide you through the return process.",
    },
    {
      icon: FiHeadphones,
      title: "Pet Product Help",
      description:
        "Not sure about sizing or which product to choose? We're happy to help.",
    },
  ];

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    setIsSubmitting(false);

    toast.success("Message sent successfully!", {
      description:
        "Thank you for contacting AtNamira. Our support team will get back to you soon.",
    });

    event.currentTarget.reset();
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isContactLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <FaPaw className="h-7 w-7 animate-pulse text-primary" />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Loading Contact Information...
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please wait a moment.
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isContactError || !contact) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border/60">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
              <FiMapPin className="h-6 w-6 text-destructive" />
            </div>

            <h2 className="mt-5 text-xl font-black">
              Contact Information Unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We couldn't load our contact information right
              now. Please try again later.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-20 text-center md:py-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            <FaPaw className="h-4 w-4 text-primary" />

            AtNamira Customer Care
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            We'd Love To Hear
            <span className="block text-primary">
              From You.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Have a question about your order, product, sizing,
            shipping, or anything else? Our friendly team is
            ready to help.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO
      ===================================================== */}

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex items-start gap-5 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </p>

                    <h3 className="mt-1 break-words font-bold">
                      {item.value}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          CONTACT + MAP
      ===================================================== */}

      <section className="container mx-auto px-4 pb-20 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <Card className="overflow-hidden border-border/60 shadow-xl">
            <div className="border-b bg-muted/30 px-6 py-6 md:px-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Send A Message
              </p>

              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                How Can We Help?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Fill out the form and our support team will get
                back to you.
              </p>
            </div>

            <CardContent className="p-6 md:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Your Name
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                {/* Phone + Subject */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number
                    </Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject
                    </Label>

                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    required
                    className="min-h-36 resize-none rounded-xl"
                  />
                </div>

                {/* Submit */}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-xl"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <FiSend className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Your information is safe with us. We only use
                  your details to respond to your request.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* =================================================
              LOCATION + MAP
          ================================================= */}

          <div className="space-y-6">
            <Card className="overflow-hidden border-border/60 shadow-xl">
              <CardContent className="p-0">
                {/* Address */}

                <div className="border-b bg-muted/30 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <FiMapPin className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        Visit AtNamira
                      </p>

                      <h2 className="mt-1 text-xl font-black">
                        {contact.locationName}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {contact.address}
                        <br />

                        {contact.city},{" "}
                        {contact.state}{" "}
                        {contact.postalCode}
                        <br />

                        {contact.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Map */}

                <div className="h-[360px] w-full bg-muted">
                  <iframe
                    title={`${contact.locationName} Location`}
                    src={contact.mapUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>

            {/* =================================================
                BUSINESS HOURS
            ================================================= */}

            <Card className="border-border/60">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiClock className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Business Hours
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {contact.businessHours?.timezone ||
                        "Local Time"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  {/* Monday - Friday */}

                  <div className="flex items-center justify-between gap-4 border-b pb-3">
                    <span className="text-muted-foreground">
                      Monday – Friday
                    </span>

                    <span className="text-right font-semibold">
                      {contact.businessHours
                        ?.mondayFriday || "Closed"}
                    </span>
                  </div>

                  {/* Saturday */}

                  <div className="flex items-center justify-between gap-4 border-b pb-3">
                    <span className="text-muted-foreground">
                      Saturday
                    </span>

                    <span className="text-right font-semibold">
                      {contact.businessHours?.saturday ||
                        "Closed"}
                    </span>
                  </div>

                  {/* Sunday */}

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Sunday
                    </span>

                    <span className="text-right font-semibold">
                      {contact.businessHours?.sunday ||
                        "Closed"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORT
      ===================================================== */}

      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Customer Support
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Here For Every Part Of Your Pet Journey.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              From choosing the right size to tracking your
              delivery, we're always happy to help.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group border-border/60 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL
      ===================================================== */}

      <section className="container mx-auto px-4 py-20">
        <div className="rounded-[2rem] border bg-card p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FaPaw className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-black">
            Follow The AtNamira Family
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Discover new collections, pet style inspiration,
            and adorable moments from the AtNamira community.
          </p>

          <div className="mt-7 flex justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-transform hover:-translate-y-1"
            >
              <FaInstagram className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-transform hover:-translate-y-1"
            >
              <FaFacebookF className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-transform hover:-translate-y-1"
            >
              <FaTwitter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

