import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface WebsitePreview {
  type: string;
  title: string;
  description: string;
}

export const LiveCodeEditor = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedSite, setGeneratedSite] = useState<WebsitePreview | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const websiteExamples = [
    {
      type: "landing",
      title: "Лендинг для кофейни",
      description: "Современный одностраничник с меню, галереей и формой бронирования столиков"
    },
    {
      type: "ecommerce",
      title: "Интернет-магазин одежды",
      description: "Каталог товаров, корзина, оформление заказа и личный кабинет"
    },
    {
      type: "portfolio",
      title: "Портфолио фотографа",
      description: "Галерея работ, страница о себе, контакты и форма для заявок"
    },
    {
      type: "blog",
      title: "Блог о путешествиях",
      description: "Список статей, страницы постов, комментарии и подписка на новости"
    },
    {
      type: "dashboard",
      title: "Панель управления",
      description: "Дашборд с аналитикой, графиками, таблицами и управлением данными"
    }
  ];

  const handleGenerate = () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const randomSite = websiteExamples[Math.floor(Math.random() * websiteExamples.length)];
      setGeneratedSite(randomSite);
      setIsGenerating(false);
    }, 2000);
  };

  const quickPrompts = [
    "Сделай лендинг для кофейни",
    "Создай интернет-магазин",
    "Портфолио для дизайнера",
    "Блог о технологиях",
  ];

  const renderWebsitePreview = () => {
    if (!generatedSite) return null;

    const previews = {
      landing: (
        <div className="space-y-4 p-6 bg-background rounded-lg">
          <div className="h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded flex items-center px-4 gap-4">
            <div className="w-24 h-6 bg-primary/40 rounded"></div>
            <div className="ml-auto flex gap-2">
              <div className="w-16 h-6 bg-muted rounded"></div>
              <div className="w-16 h-6 bg-muted rounded"></div>
              <div className="w-16 h-6 bg-muted rounded"></div>
            </div>
          </div>
          <div className="h-40 bg-gradient-to-br from-primary/30 to-secondary/30 rounded flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-48 h-8 bg-foreground/20 rounded mx-auto"></div>
              <div className="w-32 h-6 bg-foreground/10 rounded mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted/50 rounded"></div>
            ))}
          </div>
        </div>
      ),
      ecommerce: (
        <div className="space-y-4 p-6 bg-background rounded-lg">
          <div className="h-10 bg-primary/20 rounded flex items-center px-4 gap-4">
            <div className="w-20 h-5 bg-primary/40 rounded"></div>
            <div className="ml-auto w-32 h-5 bg-muted rounded"></div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square bg-muted/50 rounded"></div>
                <div className="h-3 bg-muted/30 rounded w-3/4"></div>
                <div className="h-4 bg-primary/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      portfolio: (
        <div className="space-y-4 p-6 bg-background rounded-lg">
          <div className="h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded flex items-center justify-center">
            <div className="w-32 h-6 bg-foreground/20 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded"></div>
            ))}
          </div>
        </div>
      ),
      blog: (
        <div className="space-y-4 p-6 bg-background rounded-lg">
          <div className="h-12 bg-primary/20 rounded flex items-center px-4">
            <div className="w-24 h-6 bg-primary/40 rounded"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-32 h-24 bg-muted/50 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-foreground/20 rounded w-3/4"></div>
                  <div className="h-3 bg-muted/30 rounded"></div>
                  <div className="h-3 bg-muted/30 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      dashboard: (
        <div className="space-y-4 p-6 bg-background rounded-lg">
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded p-3">
                <div className="h-3 bg-foreground/20 rounded w-2/3 mb-2"></div>
                <div className="h-5 bg-foreground/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-32 bg-muted/50 rounded p-3">
              <div className="h-3 bg-foreground/20 rounded w-1/3 mb-2"></div>
              <div className="flex items-end gap-1 mt-4 h-20">
                {[40, 65, 45, 80, 55, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{height: `${h}%`}}></div>
                ))}
              </div>
            </div>
            <div className="h-32 bg-muted/50 rounded"></div>
          </div>
        </div>
      )
    };

    return previews[generatedSite.type as keyof typeof previews] || previews.landing;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquare" size={20} />
            Опиши свой сайт
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Например: 'Сделай лендинг для кофейни с меню, галереей и формой бронирования'"
            rows={6}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="resize-none"
          />
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Примеры:</p>
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
                Создаю сайт...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={16} className="mr-2" />
                Создать сайт
              </>
            )}
          </Button>

          {generatedSite && (
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Сайт готов!</p>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Создан
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Что включено:</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Check" size={14} className="text-primary" />
                    <span>Адаптивный дизайн</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Check" size={14} className="text-primary" />
                    <span>SEO оптимизация</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Check" size={14} className="text-primary" />
                    <span>Формы с валидацией</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Check" size={14} className="text-primary" />
                    <span>Готов к публикации</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Monitor" size={20} />
            Превью сайта
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedSite ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{generatedSite.title}</h3>
                <p className="text-sm text-muted-foreground">{generatedSite.description}</p>
              </div>
              
              <div className="border border-border/50 rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-3 py-2 flex items-center gap-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-1 bg-background/50 rounded px-2 py-1 text-xs text-muted-foreground">
                    mysite.poehali.dev
                  </div>
                </div>
                <div className="bg-background/50">
                  {renderWebsitePreview()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Icon name="Code2" size={14} className="mr-2" />
                  Посмотреть код
                </Button>
                <Button size="sm" className="flex-1">
                  <Icon name="ExternalLink" size={14} className="mr-2" />
                  Открыть сайт
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              <div className="text-center space-y-3">
                <Icon name="Globe" size={64} className="mx-auto opacity-20" />
                <div className="space-y-1">
                  <p className="font-medium">Опиши какой сайт нужен</p>
                  <p className="text-sm">ИИ создаст полноценный сайт за 30 секунд</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
