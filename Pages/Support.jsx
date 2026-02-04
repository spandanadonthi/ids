import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';

const faqItems = [
  {
    question: "How does the file scan work?",
    answer: "Our system uses an advanced AI model to analyze the structure and content of your uploaded file. It checks for known malware signatures, suspicious patterns, and potential intrusion vectors to classify the file as either 'Normal' or 'Attack'."
  },
  {
    question: "What should I do if a threat is detected?",
    answer: "If a scan result shows an 'Attack' classification, do not open the file. Follow the recommendation provided, which may include deleting the file or reporting it to your administrator. Our security team is automatically notified of high-severity threats."
  },
  {
    question: "How often should I scan files?",
    answer: "It is best practice to scan any file from an untrusted or unknown source before opening it. This includes email attachments, downloads from the internet, and files from external drives."
  },
  {
    question: "Who can see my scan results?",
    answer: "Your personal scan results are private to your account. However, system administrators have access to all scan data for security monitoring and incident response purposes."
  }
];

export default function Support() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend.
    alert("Support ticket submitted! Our team will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-[var(--aqua-soft)] mb-4" />
          <h1 className="text-3xl font-bold text-[var(--navy-deep)]">Support Center</h1>
          <p className="text-gray-600">Find answers and get help from our security experts.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)]">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-[var(--navy-deep)]">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                  <Input id="name" type="text" placeholder="John Doe" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input id="email" type="email" placeholder="you@example.com" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <Input id="subject" type="text" placeholder="Regarding my last scan..." required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" placeholder="Please describe your issue in detail." required className="mt-1" />
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" className="bg-[var(--navy-deep)] hover:bg-[var(--aqua-soft)] hover:text-[var(--navy-deep)]">
                    <Mail className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}