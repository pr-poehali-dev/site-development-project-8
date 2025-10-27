import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const features = [
    {
      icon: "Sparkles",
      title: "ИИ-ассистент",
      description: "Умный помощник создаёт код по вашим описаниям на русском языке"
    },
    {
      icon: "Code2",
      title: "Редактор кода",
      description: "Встроенный редактор с подсветкой синтаксиса и автодополнением"
    },
    {
      icon: "Zap",
      title: "Мгновенная публикация",
      description: "Разверните проект в облаке за несколько секунд"
    },
    {
      icon: "Database",
      title: "База данных",
      description: "PostgreSQL база из коробки для каждого проекта"
    },
    {
      icon: "Shield",
      title: "Безопасность",
      description: "Управление секретами и переменными окружения"
    },
    {
      icon: "Blocks",
      title: "Компоненты",
      description: "Библиотека готовых UI-компонентов для быстрой разработки"
    }
  ];

  const plans = [
    {
      name: "Старт",
      price: "Бесплатно",
      description: "Для знакомства с платформой",
      features: ["1 проект", "Базовый ИИ-ассистент", "Публикация проекта", "Поддержка сообщества"],
      popular: false
    },
    {
      name: "Профи",
      price: "1 990 ₽",
      period: "/месяц",
      description: "Для серьёзных проектов",
      features: ["10 проектов", "Продвинутый ИИ", "PostgreSQL база", "Бэкенд функции", "Приоритетная поддержка"],
      popular: true
    },
    {
      name: "Команда",
      price: "4 990 ₽",
      period: "/месяц",
      description: "Для командной разработки",
      features: ["Неограниченно проектов", "Совместная работа", "Расширенная БД", "Выделенные ресурсы", "SLA 99.9%"],
      popular: false
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Rocket" className="text-primary" size={32} />
            <span className="text-2xl font-heading font-bold text-gradient">AI Dev Platform</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Возможности</a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Тарифы</a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button className="animate-glow-pulse">
            Начать
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient glow">
              Создавайте сайты силой мысли
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              ИИ-платформа для разработки веб-приложений через естественный язык. 
              Без программирования. Быстрее конструкторов в 30 раз.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 card-glow hover:scale-105 transition-transform">
                <Icon name="Rocket" className="mr-2" size={20} />
                Попробовать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                <Icon name="PlayCircle" className="mr-2" size={20} />
                Смотреть демо
              </Button>
            </div>
          </div>
          
          <div className="mt-16 relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
            <Card className="relative overflow-hidden card-glow">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Code2" size={80} className="text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
              Всё для разработки
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный набор инструментов для создания современных веб-приложений
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:card-glow transition-all duration-300 hover:scale-105 animate-scale-in border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={feature.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
              Выберите свой план
            </h2>
            <p className="text-xl text-muted-foreground">
              Начните бесплатно, масштабируйтесь по мере роста
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative ${plan.popular ? 'border-primary card-glow scale-105' : 'border-border/50'} transition-all duration-300 hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-semibold">
                      Популярный
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-heading font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-heading font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-1" size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Начать сейчас" : "Выбрать план"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-muted-foreground">
              Есть вопросы? Мы всегда готовы помочь
            </p>
          </div>
          
          <Card className="card-glow">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input 
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    placeholder="Расскажите о вашем проекте..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Rocket" className="text-primary" size={24} />
              <span className="font-heading font-bold text-gradient">AI Dev Platform</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AI Dev Platform. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
