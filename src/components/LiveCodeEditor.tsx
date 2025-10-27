import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const LiveCodeEditor = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const codeExamples = [
    `const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <form className="space-y-4">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Пароль" />
      <Button>Войти</Button>
    </form>
  );
};`,
    `const ProductCard = ({ title, price, image }) => {
  return (
    <Card>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} ₽</p>
      <Button>Купить</Button>
    </Card>
  );
};`,
    `const Dashboard = () => {
  const stats = [
    { label: "Пользователи", value: "1,234" },
    { label: "Продажи", value: "56,789 ₽" },
    { label: "Заказы", value: "89" },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};`,
  ];

  const handleGenerate = () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];
      setGeneratedCode(randomCode);
      setIsGenerating(false);
    }, 1500);
  };

  const quickPrompts = [
    "Создай форму регистрации",
    "Сделай карточку товара",
    "Добавь дашборд с статистикой",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquare" size={20} />
            Твоё описание
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Опиши что нужно создать: 'Сделай форму входа с email и паролем'"
            rows={6}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="resize-none"
          />
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Попробуй:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => setUserPrompt(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !userPrompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Генерирую код...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={16} className="mr-2" />
                Создать код
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-[#1e1e1e]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Icon name="Code2" size={20} />
            Сгенерированный код
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedCode ? (
            <div className="space-y-4">
              <pre className="text-sm text-green-400 font-mono overflow-x-auto p-4 bg-black/30 rounded-lg">
                <code>{generatedCode}</code>
              </pre>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Icon name="Copy" size={14} className="mr-2" />
                  Копировать
                </Button>
                <Button size="sm" className="flex-1">
                  <Icon name="Play" size={14} className="mr-2" />
                  Запустить
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <div className="text-center space-y-2">
                <Icon name="FileCode" size={48} className="mx-auto opacity-30" />
                <p className="text-sm">Опиши что нужно создать, и ИИ сгенерирует код</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
