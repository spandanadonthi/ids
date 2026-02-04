import React, { useState } from 'react';
import { MessageSquare, X, Upload, Shield, HelpCircle, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AquaSentinelBot({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `🐬 Hello ${user?.full_name?.split(' ')[0] || 'there'}! I'm AquaSentinel, your security assistant. How can I help protect your digital environment today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  const quickActions = user?.role === 'admin' ? [
    { label: 'Scan Files', icon: Upload, action: () => navigate(createPageUrl('Upload')) },
    { label: 'View Alerts', icon: Shield, action: () => navigate(createPageUrl('AlertsManagement')) },
    { label: 'Check Logs', icon: FileText, action: () => navigate(createPageUrl('LogsManagement')) },
    { label: 'Security Tips', icon: HelpCircle, action: () => handleQuickMessage('Give me security tips for administrators') }
  ] : [
    { label: 'Scan My File', icon: Upload, action: () => navigate(createPageUrl('Upload')) },
    { label: 'Explain Last Scan', icon: Shield, action: () => handleQuickMessage('Explain my last security scan') },
    { label: 'Security Tips', icon: HelpCircle, action: () => handleQuickMessage('Give me personal security tips') },
    { label: 'Get Help', icon: MessageSquare, action: () => navigate(createPageUrl('Support')) }
  ];

  const getIntelligentResponse = (message) => {
    const msg = message.toLowerCase();
    
    // Threat-related questions
    if (msg.includes('threat') || msg.includes('attack') || msg.includes('malware')) {
      return '🛡️ I detect you\'re asking about threats! Our IDS system monitors for various attack types including DoS, XSS, SQL injection, and malware. Would you like me to explain any specific threat type or show you recent alerts?';
    }
    
    // File scanning questions
    if (msg.includes('scan') || msg.includes('file') || msg.includes('upload')) {
      return '📁 File scanning is one of our core features! Simply drag and drop any file into our scanner, and our AI will analyze it for potential threats. Supported formats include PDF, TXT, CSV, JSON, XML, PCAP, and more. Want to try it now?';
    }
    
    // How-to questions
    if (msg.includes('how') || msg.includes('what')) {
      if (msg.includes('work')) {
        return '⚙️ Our IDS works by analyzing file patterns, network traffic, and user behavior using advanced machine learning. It compares against known threat signatures and behavioral anomalies to detect potential security risks in real-time.';
      }
      if (msg.includes('safe')) {
        return '🔒 To stay safe: Always scan suspicious files, keep software updated, use strong passwords, enable 2FA, and be cautious with email attachments. Regular security audits are also recommended!';
      }
    }
    
    // Performance/status questions
    if (msg.includes('status') || msg.includes('health') || msg.includes('system')) {
      return '📊 System status: All security modules are operational! Detection engines are running optimally, threat databases are up-to-date, and monitoring is active 24/7. Everything looks secure on my end!';
    }
    
    // Admin-specific responses
    if (user?.role === 'admin') {
      if (msg.includes('user') || msg.includes('manage')) {
        return '👥 As an admin, you can manage users, review system logs, configure alerts, and adjust security settings. Need help with any specific administrative task?';
      }
      if (msg.includes('log') || msg.includes('report')) {
        return '📋 You can access detailed logs and generate reports from the admin dashboard. Export options include CSV and PDF formats for compliance and analysis purposes.';
      }
    }
    
    // General help
    if (msg.includes('help') || msg.includes('support')) {
      return '💡 I\'m here to help! You can ask me about security threats, file scanning, system status, or use the quick actions above. For detailed support, check out our Support Center with FAQs and contact forms.';
    }
    
    // Default responses with variety
    const defaultResponses = [
      '🐬 That\'s an interesting question! I can help you with file scanning, threat analysis, security tips, or system navigation. What would you like to know more about?',
      '🔍 I\'m always learning! For specific technical questions, our Support Center has detailed documentation. Meanwhile, I can help you navigate the system or explain our security features.',
      '💭 I understand you\'re looking for information. Try asking about file scanning, security threats, system status, or how our IDS works - I\'d love to help with those topics!',
      '🎯 Let me help you with that! I specialize in security guidance, threat detection explanations, and system navigation. What specific aspect interests you most?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleQuickMessage = (message) => {
    setMessages(prev => [...prev, { type: 'user', content: message, timestamp: new Date() }]);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = getIntelligentResponse(message);
      setMessages(prev => [...prev, { type: 'bot', content: response, timestamp: new Date() }]);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    handleQuickMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--navy-deep)] to-[var(--aqua-soft)] hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-[var(--navy-deep)] to-[var(--aqua-soft)] text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-lg">🐬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">AquaSentinel</h3>
                      <p className="text-xs text-white/80">Security Assistant • Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-[var(--aqua-soft)] text-[var(--navy-deep)] rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={action.action}
                        className="justify-start text-xs border-[var(--aqua-soft)]/30 hover:bg-[var(--aqua-soft)]/10"
                      >
                        <action.icon className="w-3 h-3 mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask AquaSentinel..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-sm"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-[var(--aqua-soft)] hover:bg-[var(--navy-deep)] text-[var(--navy-deep)] hover:text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}