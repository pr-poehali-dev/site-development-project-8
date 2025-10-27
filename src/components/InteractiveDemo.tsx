import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<"site" | "structure">("site");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "site" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("site")}
          >
            <Icon name="Globe" size={16} className="mr-2" />
            Готовый сайт
          </Button>
          <Button
            variant={activeTab === "structure" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("structure")}
          >
            <Icon name="Folder" size={16} className="mr-2" />
            Структура
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          {isDeployed && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
              <Icon name="CheckCircle" size={14} className="mr-1" />
              Опубликовано
            </Badge>
          )}
          <Button
            size="sm"
            onClick={handleDeploy}
            disabled={isDeploying}
            className="relative overflow-hidden"
          >
            {isDeploying ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Публикация...
              </>
            ) : (
              <>
                <Icon name="Rocket" size={16} className="mr-2" />
                Опубликовать
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="border-border/50 overflow-hidden card-glow">
        <CardContent className="p-0">
          {activeTab === "site" ? (
            <div className="relative">
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
              
              <div className="bg-gradient-to-br from-background to-muted/20 p-8 min-h-[400px]">
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 rounded-xl p-8 text-center border border-amber-700/30">
                    <div className="inline-block mb-4">
                      <div className="w-16 h-16 bg-amber-600/40 rounded-full flex items-center justify-center">
                        <Icon name="Coffee" size={32} className="text-amber-400" />
                      </div>
                    </div>
                    <h1 className="text-4xl font-heading font-bold mb-3 text-gradient">Уютная Кофейня</h1>
                    <p className="text-lg text-muted-foreground mb-6">Лучший кофе в городе с 2010 года</p>
                    <div className="flex gap-3 justify-center">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Icon name="MapPin" size={16} className="mr-2" />
                        Забронировать столик
                      </Button>
                      <Button variant="outline">Меню</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: "Coffee", title: "Эспрессо", price: "150 ₽" },
                      { icon: "Coffee", title: "Капучино", price: "200 ₽" },
                      { icon: "Coffee", title: "Латте", price: "220 ₽" }
                    ].map((item, i) => (
                      <Card key={i} className="border-border/50 bg-muted/30">
                        <CardContent className="p-4 text-center">
                          <Icon name={item.icon} className="mx-auto mb-2 text-amber-500" size={32} />
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-primary font-bold">{item.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1e1e1e] p-8 min-h-[400px] font-mono text-sm">
              <div className="space-y-3 text-green-400">
                <div className="flex items-center gap-2">
                  <Icon name="Folder" size={16} className="text-blue-400" />
                  <span className="text-blue-300">src/</span>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="FileCode" size={14} className="text-purple-400" />
                    <span>App.tsx</span>
                    <span className="text-muted-foreground text-xs ml-auto">Главный компонент</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Folder" size={14} className="text-blue-400" />
                    <span className="text-blue-300">pages/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>Home.tsx</span>
                      <span className="text-muted-foreground text-xs ml-auto">Главная страница</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>Menu.tsx</span>
                      <span className="text-muted-foreground text-xs ml-auto">Страница меню</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>Booking.tsx</span>
                      <span className="text-muted-foreground text-xs ml-auto">Форма бронирования</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Folder" size={14} className="text-blue-400" />
                    <span className="text-blue-300">components/</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>Header.tsx</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>ProductCard.tsx</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileCode" size={12} className="text-purple-400" />
                      <span>BookingForm.tsx</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="FileCode" size={14} className="text-yellow-400" />
                    <span className="text-yellow-300">index.css</span>
                    <span className="text-muted-foreground text-xs ml-auto">Стили</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30 text-muted-foreground text-xs">
                  <p>✓ 8 компонентов • 3 страницы • Полностью адаптивный дизайн</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 hover:card-glow transition-all">
          <CardContent className="p-4 text-center">
            <Icon name="Zap" className="text-primary mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">30 сек</p>
            <p className="text-xs text-muted-foreground">Полный сайт готов</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 hover:card-glow transition-all">
          <CardContent className="p-4 text-center">
            <Icon name="Layout" className="text-secondary mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">8 страниц</p>
            <p className="text-xs text-muted-foreground">Со всеми функциями</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 hover:card-glow transition-all">
          <CardContent className="p-4 text-center">
            <Icon name="Smartphone" className="text-accent-foreground mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-muted-foreground">Адаптивный</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
