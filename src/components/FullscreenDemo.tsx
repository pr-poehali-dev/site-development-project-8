import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface GeneratedSite {
  type: string;
  title: string;
  description: string;
  color: string;
  pages: number;
}

export const FullscreenDemo = () => {
  const [activeTab, setActiveTab] = useState<"site" | "structure">("site");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: "Привет! Я создаю полноценные сайты. Опиши какой сайт нужен, и я сделаю его за 30 секунд! 🚀",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const siteTemplates = [
    {
      keywords: ["кофе", "кофейн", "cafe", "coffee"],
      type: "coffee",
      title: "Уютная Кофейня",
      description: "Лендинг для кофейни с меню и бронированием",
      color: "amber",
      pages: 5,
    },
    {
      keywords: ["магазин", "shop", "интернет-магазин", "одежд"],
      type: "shop",
      title: "Магазин Одежды",
      description: "Интернет-магазин с каталогом и корзиной",
      color: "blue",
      pages: 8,
    },
    {
      keywords: ["портфолио", "portfolio", "дизайнер", "фотограф"],
      type: "portfolio",
      title: "Портфолио Дизайнера",
      description: "Портфолио с галереей работ",
      color: "purple",
      pages: 4,
    },
    {
      keywords: ["блог", "blog", "статьи"],
      type: "blog",
      title: "Блог о Технологиях",
      description: "Блог с системой комментариев",
      color: "green",
      pages: 6,
    },
    {
      keywords: ["ресторан", "restaurant", "еда"],
      type: "restaurant",
      title: "Ресторан",
      description: "Сайт ресторана с меню и бронированием",
      color: "red",
      pages: 5,
    },
  ];

  const generateSite = async (prompt: string) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const lowerPrompt = prompt.toLowerCase();
    let selectedTemplate = siteTemplates[0];

    for (const template of siteTemplates) {
      if (template.keywords.some(keyword => lowerPrompt.includes(keyword))) {
        selectedTemplate = template;
        break;
      }
    }

    const steps = [
      "Анализирую описание...",
      "Создаю структуру сайта...",
      "Генерирую компоненты...",
      "Настраиваю дизайн...",
      "Добавляю интерактивность...",
      "Оптимизирую код...",
      "Готово! ✨",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress((i + 1) * (100 / steps.length));
      
      if (i < steps.length - 1) {
        const stepMessage: Message = {
          id: `gen-${Date.now()}-${i}`,
          text: steps[i],
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, stepMessage]);
      }
    }

    setGeneratedSite(selectedTemplate);
    
    const finalMessage: Message = {
      id: `gen-final-${Date.now()}`,
      text: `Готово! Создал сайт "${selectedTemplate.title}" 🎉\n\n✓ ${selectedTemplate.pages} страниц\n✓ Адаптивный дизайн\n✓ SEO оптимизация\n✓ Готов к публикации\n\nМожешь посмотреть результат справа или попросить изменить что-то!`,
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, finalMessage]);
    
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const prompt = inputValue;
    setInputValue("");
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));
    setIsTyping(false);

    await generateSite(prompt);
  };

  const quickPrompts = [
    "Сделай лендинг для кофейни",
    "Создай интернет-магазин одежды",
    "Портфолио для дизайнера",
  ];

  const renderSitePreview = () => {
    if (!generatedSite) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Icon name="Sparkles" size={64} className="mx-auto text-primary/30" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Опиши какой сайт нужен</p>
              <p className="text-sm text-muted-foreground">ИИ создаст полноценный проект за 30 секунд</p>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputValue(prompt);
                  }}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const colorClasses = {
      amber: { bg: "from-amber-950/40", border: "border-amber-600/20", icon: "text-amber-400", button: "bg-amber-600 hover:bg-amber-700" },
      blue: { bg: "from-blue-950/40", border: "border-blue-600/20", icon: "text-blue-400", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "from-purple-950/40", border: "border-purple-600/20", icon: "text-purple-400", button: "bg-purple-600 hover:bg-purple-700" },
      green: { bg: "from-green-950/40", border: "border-green-600/20", icon: "text-green-400", button: "bg-green-600 hover:bg-green-700" },
      red: { bg: "from-red-950/40", border: "border-red-600/20", icon: "text-red-400", button: "bg-red-600 hover:bg-red-700" },
    };

    const colors = colorClasses[generatedSite.color as keyof typeof colorClasses];

    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="overflow-hidden border-border/50 card-glow">
          <div className="bg-muted/30 px-4 py-2 flex items-center gap-3 border-b border-border/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <div className="flex-1 bg-background/80 rounded px-3 py-1 text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Lock" size={12} className="text-green-500" />
              <span>{generatedSite.type}.poehali.dev</span>
            </div>
          </div>

          <CardContent className="p-0">
            <div className={`bg-gradient-to-br ${colors.bg} via-background to-background p-12`}>
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-6">
                  <div className={`inline-flex w-20 h-20 bg-${generatedSite.color}-600/30 rounded-full items-center justify-center border-2 ${colors.border}`}>
                    <Icon name="Sparkles" size={40} className={colors.icon} />
                  </div>
                  <h1 className="text-5xl font-heading font-bold text-gradient">
                    {generatedSite.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {generatedSite.description}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className={colors.button}>
                      <Icon name="Rocket" size={18} className="mr-2" />
                      Начать
                    </Button>
                    <Button size="lg" variant="outline">Узнать больше</Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {["Feature 1", "Feature 2", "Feature 3"].map((item, i) => (
                    <Card key={i} className={`${colors.border} bg-card/50 hover:bg-card transition-all cursor-pointer hover:scale-105`}>
                      <CardContent className="p-6 text-center">
                        <Icon name="CheckCircle" className={colors.icon + " mx-auto mb-3"} size={40} />
                        <h3 className="font-semibold text-lg mb-2">{item}</h3>
                        <p className="text-sm text-muted-foreground">Описание функции</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Icon name="Zap" className="text-primary mx-auto mb-3" size={32} />
              <p className="text-3xl font-bold mb-1">30 сек</p>
              <p className="text-sm text-muted-foreground">Время создания</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Icon name="FileText" className="text-secondary mx-auto mb-3" size={32} />
              <p className="text-3xl font-bold mb-1">{generatedSite.pages} страниц</p>
              <p className="text-sm text-muted-foreground">Полный функционал</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Icon name="Smartphone" className="text-green-500 mx-auto mb-3" size={32} />
              <p className="text-3xl font-bold mb-1">100%</p>
              <p className="text-sm text-muted-foreground">Адаптивный</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex">
      <div className="w-[400px] border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Sparkles" size={20} />
            </div>
            <div>
              <h3 className="font-heading font-semibold">ИИ Ассистент</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Онлайн
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  </div>
                </div>
              </div>
            )}
            {isGenerating && generationProgress > 0 && (
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin text-primary" />
                    <span className="text-sm font-medium">Создаю сайт...</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(generationProgress)}%</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Опиши какой сайт нужен..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isGenerating}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" disabled={isGenerating}>
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card p-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "site" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("site")}
            >
              <Icon name="Globe" size={16} className="mr-2" />
              Готовый сайт
            </Button>
            <Button
              variant={activeTab === "structure" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("structure")}
            >
              <Icon name="FolderTree" size={16} className="mr-2" />
              Структура
            </Button>
          </div>

          <Button className="bg-primary hover:bg-primary/90" disabled={!generatedSite}>
            <Icon name="Upload" size={16} className="mr-2" />
            Опубликовать
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-muted/5">
          {activeTab === "site" ? (
            <div className="max-w-6xl mx-auto">
              {renderSitePreview()}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {generatedSite ? (
                <Card className="bg-[#1a1a1a] border-border/50">
                  <CardContent className="p-8 font-mono text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Icon name="Folder" size={18} />
                        <span className="font-semibold">src/</span>
                      </div>
                      <div className="ml-6 space-y-2 text-green-400">
                        <div className="flex items-center gap-2">
                          <Icon name="FileCode" size={16} className="text-purple-400" />
                          <span>App.tsx</span>
                          <span className="text-muted-foreground text-xs ml-auto">Главный компонент</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400">
                          <Icon name="Folder" size={16} />
                          <span>pages/</span>
                        </div>
                        <div className="ml-6 space-y-1.5">
                          {["Home.tsx", "About.tsx", "Contact.tsx", "Services.tsx", "Portfolio.tsx"].slice(0, generatedSite.pages).map((file) => (
                            <div key={file} className="flex items-center gap-2 text-green-400">
                              <Icon name="FileCode" size={14} className="text-purple-400" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-blue-400">
                          <Icon name="Folder" size={16} />
                          <span>components/</span>
                        </div>
                        <div className="ml-6 space-y-1.5">
                          {["Header.tsx", "Footer.tsx", "Card.tsx", "Button.tsx"].map((file) => (
                            <div key={file} className="flex items-center gap-2 text-green-400">
                              <Icon name="FileCode" size={14} className="text-purple-400" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/30">
                        <div className="flex gap-4 text-muted-foreground text-xs">
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            <Icon name="CheckCircle" size={12} className="mr-1" />
                            {generatedSite.pages + 4} компонентов
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                            <Icon name="Layout" size={12} className="mr-1" />
                            {generatedSite.pages} страниц
                          </Badge>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                            <Icon name="Smartphone" size={12} className="mr-1" />
                            Адаптивный
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <Icon name="FolderOpen" size={64} className="mx-auto text-muted-foreground/30" />
                    <p className="text-muted-foreground">Сначала создай сайт через чат</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
