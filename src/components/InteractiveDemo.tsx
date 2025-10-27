import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const sampleCode = `import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="p-8">
      <h1>Привет, мир!</h1>
      <Button>Нажми меня</Button>
    </div>
  );
};`;

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("preview")}
          >
            <Icon name="Eye" size={16} className="mr-2" />
            Превью
          </Button>
          <Button
            variant={activeTab === "code" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("code")}
          >
            <Icon name="Code2" size={16} className="mr-2" />
            Код
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

      <Card className="border-border/50 overflow-hidden">
        <CardContent className="p-0">
          {activeTab === "preview" ? (
            <div className="bg-gradient-to-br from-background to-muted/30 p-8 min-h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4 animate-fade-in">
                <h2 className="text-3xl font-heading font-bold text-gradient">
                  Привет, мир!
                </h2>
                <Button className="animate-glow-pulse">
                  Нажми меня
                </Button>
                <p className="text-sm text-muted-foreground">
                  Создано ИИ за 3 секунды
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#1e1e1e] p-6 min-h-[300px]">
              <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                <code>{sampleCode}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Icon name="Zap" className="text-primary mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">3 сек</p>
            <p className="text-xs text-muted-foreground">Время создания</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Icon name="FileCode" className="text-secondary mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">42 строки</p>
            <p className="text-xs text-muted-foreground">Код сгенерирован</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <Icon name="Globe" className="text-accent-foreground mx-auto mb-2" size={24} />
            <p className="text-2xl font-bold">1 клик</p>
            <p className="text-xs text-muted-foreground">До публикации</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
