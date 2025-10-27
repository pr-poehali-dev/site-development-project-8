import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const FullscreenDemo = () => {
  const [activeTab, setActiveTab] = useState<"site" | "structure">("site");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Добавь все функции",
      sender: "user",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "2", 
      text: "Добавлю интерактивный чат с ИИ-ассистентом и демо-функционал платформы!\n\nГотово! Добавил все интерактивные функции на платформу 🎯\n\nНовые возможности:\n- Чат с ИИ-ассистентом — плавающая кнопка справа внизу для общения с ИИ\n- Интерактивное демо — переключение между превью и кодом, кнопка публикации\n- Живой редактор кода — пиши описание → ИИ генерирует код в реальном времени\n- Быстрые промпты — готовые примеры для тестирования\n- Статистика генерации — время, строки кода, количество кликов\n\nХочешь, я добавлю секцию с отзывами клиентов и кейсами успешных проектов?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "3",
      text: "сайт должен не просто код генерить, а полноценные сайты.",
      sender: "user",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "4",
      text: "Понял! Перестраиваю платформу на создание полноценных сайтов, а не просто кода 🚀\n\nГотово! Теперь платформа создаёт полноценные сайты 🌐\n\nЧто изменил:\n- Hero: \"Создавайте сайты за 30 секунд\" вместо \"силой мысли\"\n- Описание: ИИ создаёт полные проекты — лендинги, магазины, блоги\n- Демо: показывает готовый сайт кофейни с меню и структурой\n- Живой редактор: генерирует превью разных типов сайтов\n- Чат: ИИ говорит про создание сайтов, а не просто кода\n- Возможности: упор на полноценные проекты со страницами\n\nХочешь, я добавлю раздел с примерами готовых сайтов (галерею шаблонов)?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        "Отлично! Создаю полноценный лендинг с главной страницей, меню и контактами...",
        "Готово! Сайт с 5 страницами создан. Добавить форму обратной связи?",
        "Настроил базу данных и бэкенд для обработки заказов.",
      ];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
              <h3 className="font-heading font-semibold">Проект сайта</h3>
              <p className="text-xs text-muted-foreground">Добавь все функции</p>
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
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Напишите сообщение..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
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

          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="Upload" size={16} className="mr-2" />
            Опубликовать
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-muted/5">
          {activeTab === "site" ? (
            <div className="max-w-6xl mx-auto space-y-6">
              <Card className="overflow-hidden border-border/50 card-glow">
                <div className="bg-muted/30 px-4 py-2 flex items-center gap-3 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="flex-1 bg-background/80 rounded px-3 py-1 text-sm text-muted-foreground flex items-center gap-2">
                    <Icon name="Lock" size={12} className="text-green-500" />
                    <span>coffee-shop.poehali.dev</span>
                  </div>
                </div>

                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-amber-950/40 via-background to-background p-12">
                    <div className="max-w-4xl mx-auto space-y-8">
                      <div className="text-center space-y-6">
                        <div className="inline-flex w-20 h-20 bg-amber-600/30 rounded-full items-center justify-center border-2 border-amber-600/50">
                          <Icon name="Coffee" size={40} className="text-amber-400" />
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-gradient">
                          Уютная Кофейня
                        </h1>
                        <p className="text-xl text-muted-foreground">
                          Лучший кофе в городе с 2010 года
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                            <Icon name="MapPin" size={18} className="mr-2" />
                            Забронировать столик
                          </Button>
                          <Button size="lg" variant="outline">Меню</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { icon: "Coffee", title: "Эспрессо", price: "150 ₽" },
                          { icon: "Coffee", title: "Капучино", price: "200 ₽" },
                          { icon: "Coffee", title: "Milk", price: "220 ₽" }
                        ].map((item, i) => (
                          <Card key={i} className="border-amber-600/20 bg-card/50 hover:bg-card transition-colors cursor-pointer">
                            <CardContent className="p-6 text-center">
                              <Icon name={item.icon} className="mx-auto mb-3 text-amber-500" size={40} />
                              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                              <p className="text-2xl font-bold text-amber-600">{item.price}</p>
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
                    <p className="text-sm text-muted-foreground">Полный сайт готов</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50">
                  <CardContent className="p-6 text-center">
                    <Icon name="FileText" className="text-secondary mx-auto mb-3" size={32} />
                    <p className="text-3xl font-bold mb-1">8 страниц</p>
                    <p className="text-sm text-muted-foreground">Со всеми функциями</p>
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
          ) : (
            <div className="max-w-4xl mx-auto">
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
                        {["Home.tsx", "Menu.tsx", "About.tsx", "Contact.tsx", "Booking.tsx"].map((file) => (
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
                        {["Header.tsx", "Footer.tsx", "ProductCard.tsx", "BookingForm.tsx"].map((file) => (
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
                          8 компонентов
                        </Badge>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          <Icon name="Layout" size={12} className="mr-1" />
                          5 страниц
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
