import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  delay: number;
  typingDuration?: number;
}

const messages: Message[] = [
  { id: 1, text: "Йоу, Дэвид! Прием-прием! Ты в эфире? На связи школьник из будущего. Говорят, ты там в Африке как рыба в воде. Сразу главный вопрос: как ты ориентируешься без навигатора? Ты ж не на тапок смотришь? 😅", isUser: true, delay: 1000 },
  { id: 2, text: "Приветствую, путешественник во времени! Мой навигатор — это звезды, солнце и, прости за подробности, мох на деревьях. Но есть один лайфхак покруче: я использую секреты арабских торговцев. Они веками ходили по Сахаре, ориентируясь по ветрам и звездам. Я просто записал их знания, как апгрейнул свой скилл «Выживание». Один старый торговец научил меня находить воду по муравейникам определенного вида. Вот так-то.", isUser: false, delay: 4000, typingDuration: 3000 },
  { id: 3, text: "Обалдеть! А с местными как общаешься? Язык жестов, типа «дай поесть» и «где туалет»? 😂", isUser: true, delay: 8000 },
  { id: 4, text: "Ха! Жесты — это наше всё, но я кое-что знаю. Например, я первым из европейцев подробно описал озеро Ньяса и услышал от местных племен о огромном внутреннем море где-то в центре континента. Все думали, что я прикалываюсь, но это оказалось правдой! Они называли его иначе, но мы его знаем как озеро Виктория. А еще я выучил слово «мбугу» на суахили — так называют антилопу. Попробуй блеснуть знанием на уроке!", isUser: false, delay: 11000, typingDuration: 3000 },
  { id: 5, text: "Крутяк! А с дикими животными часто стычки бывают? Допустим, лев – это же лютый босс. Как от него увернуться?", isUser: true, delay: 15000 },
  { id: 6, text: "Лев – это не босс, это стелс-ниндзя. Однажды один такой чуть не отправил меня в бан, напав сзади. Но знаешь, что страшнее льва? Муха цеце. Вот это настоящий рейд-босс! Она переносит сонную болезнь, от которой нет спасения. Но я открыл миру кое-что важное: болезнь переносится не «плохим воздухом», как все думали, а именно этими мухами. Так что, спасибо моим лихорадкам – они помогли науке!", isUser: false, delay: 18000, typingDuration: 3000 },
  { id: 7, text: "Жесть... А что самое красивое ты видел? Вот прям залипал и забывал про все.", isUser: true, delay: 22000 },
  { id: 8, text: "Водопад, который я назвал Виктория. Местные зовут его «Моси-оа-Тунья» — «Гремящий Дым». Представь: стену воды шириной почти в два километра обрушивается в пропасть с грохотом, который слышен за 40 километров! Брызги поднимаются на 400 метров вверх, их видно как облако за много миль. Это зрелище, ради которого стоит жить. Я был первым европейцем, кто его увидел и описал. Вот мой самый виральный пост, если хочешь.", isUser: false, delay: 25000, typingDuration: 3000 },
  { id: 9, text: "Вау, это же как... IRL-графика на ультра-настройках! А зачем ты вообще все это терпишь? Не думал все забить и вернуться к нормальной жизни?", isUser: true, delay: 29000 },
  { id: 10, text: "Понимаешь, есть вещи поважнее комфорта. Я, например, яростно борюсь с арабской работорговлей. Я видел ужасные вещи: караваны рабов, сломанные судьбы. И я верю, что если проложить торговые пути и показать, что Африка богата не только рабами, но и ресурсами, это зло можно остановить. Каждое мое открытие — это еще один гвоздь в крышку гроба рабства. Вот тебе мой главный лайфхак: если у тебя есть цель больше тебя самого, ты сможешь пережить и лихорадку, и голод.", isUser: false, delay: 32000, typingDuration: 3000 },
  { id: 11, text: "Это мощно... Залип. Получается, ты не просто путешественник, ты – гуманист с компасом. Кстати, о компасе... У тебя там точно нет сигнала? А то я мог бы тебе скинуть парочку видосов, как правильно мапу апдейтить. 😉", isUser: true, delay: 36000 },
  { id: 12, text: "Спасибо, друг! Но мой «интернет» здесь — это шепот саванны, грохот Виктории и мудрость людей, которых я встречаю. И он ни капли не лагает. Цени свой быстрый вай-фай, но не забывай иногда выходить в оффлайн. В мире полно своих «Гремящих Дымов», которые ждут, когда их обнаружат. И помни еще один факт: я открыл не только водопады, но и несколько новых видов растений, включая один род цикламенов, названный в мою честь – «Cyclamen livinstonium». Так что, если увидишь такой цветок – знай, это мой тебе привет через века.", isUser: false, delay: 39000, typingDuration: 3000 },
  { id: 13, text: "Обязательно поищу! Спасибо за все, бро! Ты – настоящий гигачад географии. Если что, ты знаешь, где меня найти. Обнял за монитор! Удачи в пути, первооткрыватель! ✌️ #ЛивингстонЛегенда", isUser: true, delay: 43000 }
];

const facts = [
  { icon: "Compass", title: "Водопад Виктория", text: "Первый европеец, описавший водопад Моси-оа-Тунья (Гремящий Дым), назвал его в честь королевы Виктории" },
  { icon: "Map", title: "Озеро Ньяса", text: "Открыл и подробно описал озеро Ньяса (ныне Малави) - одно из крупнейших в Африке" },
  { icon: "Bug", title: "Муха цеце", text: "Установил связь между мухой цеце и сонной болезнью, спасая тысячи жизней" },
  { icon: "Flower2", title: "Цикламен Ливингстона", text: "В его честь назван род цикламенов - Cyclamen livinstonium" },
  { icon: "Users", title: "Борьба с рабством", text: "Активно боролся с арабской работорговлей, показывая миру богатства Африки" },
  { icon: "Star", title: "Навигация по звездам", text: "Использовал знания арабских торговцев для ориентирования в пустынях и джунглях" }
];

const Index = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingMessages, setTypingMessages] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, typingMessages]);

  const startAnimation = () => {
    setIsAnimating(true);
    setVisibleMessages([]);
    setTypingMessages([]);
    
    messages.forEach((msg) => {
      if (!msg.isUser && msg.typingDuration) {
        setTimeout(() => {
          setTypingMessages(prev => [...prev, msg.id]);
        }, msg.delay - msg.typingDuration);
      }
      
      setTimeout(() => {
        setTypingMessages(prev => prev.filter(id => id !== msg.id));
        setVisibleMessages(prev => [...prev, msg.id]);
      }, msg.delay);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="title" className="w-full">
        <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Icon name="MessageCircle" size={28} />
                <div>
                  <h1 className="font-bold text-lg">Дэвид Ливингстон</h1>
                  <p className="text-xs opacity-90">онлайн</p>
                </div>
              </div>
            </div>
            <TabsList className="w-full justify-start bg-primary/90 border-t border-primary-foreground/20 rounded-none h-12">
              <TabsTrigger value="title" className="data-[state=active]:bg-primary-foreground/20">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary-foreground/20">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Переписка
              </TabsTrigger>
              <TabsTrigger value="facts" className="data-[state=active]:bg-primary-foreground/20">
                <Icon name="Lightbulb" size={16} className="mr-2" />
                Факты
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-primary-foreground/20">
                <Icon name="Map" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-primary-foreground/20">
                <Icon name="Images" size={16} className="mr-2" />
                Галерея
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <TabsContent value="title" className="mt-0">
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-primary animate-slide-up">
                  Переписка в Телеграм
                </h1>
                <h2 className="text-3xl md:text-4xl font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  с Дэвидом Ливингстоном
                </h2>
              </div>
              
              <div className="max-w-2xl space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl text-muted-foreground">
                  «Онлайн-конференция с первооткрывателем:<br />От Виктории до Цикламенов»
                </p>
                <div className="flex items-center justify-center gap-2 text-lg">
                  <Icon name="User" size={20} />
                  <span>Интерактивная образовательная презентация</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <Icon name="MessageCircle" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Живая переписка</h3>
                  <p className="text-sm text-muted-foreground">Диалог с первооткрывателем в формате современного мессенджера</p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <Icon name="Map" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Карта открытий</h3>
                  <p className="text-sm text-muted-foreground">Маршруты легендарных экспедиций по Африке</p>
                </Card>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <Icon name="Lightbulb" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Интересные факты</h3>
                  <p className="text-sm text-muted-foreground">Удивительные открытия и достижения исследователя</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <Card className="max-w-4xl mx-auto">
              <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} />
                  </div>
                  <div>
                    <h2 className="font-semibold">Дэвид Ливингстон</h2>
                    <p className="text-xs opacity-90">в сети • Africa, 1855</p>
                  </div>
                </div>
                {!isAnimating && (
                  <Button 
                    onClick={startAnimation}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <Icon name="Play" size={16} />
                    Начать диалог
                  </Button>
                )}
              </div>
              
              <div className="h-[600px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
                {messages
                  .filter(msg => visibleMessages.includes(msg.id))
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div className={`message-bubble ${msg.isUser ? 'message-user' : 'message-contact'}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.delay).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                
                {typingMessages.map((msgId) => (
                  <div key={`typing-${msgId}`} className="flex justify-start animate-slide-up">
                    <div className="message-bubble message-contact">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 bg-card border-t flex items-center gap-3">
                <Icon name="Paperclip" size={20} className="text-muted-foreground" />
                <div className="flex-1 bg-secondary/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                  Напишите сообщение...
                </div>
                <Icon name="Mic" size={20} className="text-muted-foreground" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Интересные факты об открытиях</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facts.map((fact, index) => (
                  <Card 
                    key={index} 
                    className="p-6 hover:shadow-xl transition-all hover:scale-105 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={fact.icon as any} size={32} className="text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">{fact.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fact.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Карта путешествий Ливингстона</h2>
              <Card className="overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/c3916d3f-e2b4-49c4-a683-504f35c184e7.jpg"
                  alt="Карта путешествий Дэвида Ливингстона"
                  className="w-full h-auto"
                />
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    Ключевые точки маршрута
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                      <div>
                        <p className="font-semibold">Водопад Виктория</p>
                        <p className="text-sm text-muted-foreground">Моси-оа-Тунья - Гремящий Дым</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                      <div>
                        <p className="font-semibold">Озеро Ньяса</p>
                        <p className="text-sm text-muted-foreground">Одно из Великих Африканских озер</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                      <div>
                        <p className="font-semibold">Озеро Виктория</p>
                        <p className="text-sm text-muted-foreground">Крупнейшее озеро Африки</p>
                      </div>
                    </li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="Calendar" size={24} className="text-primary" />
                    Временная шкала экспедиций
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold text-primary">1841</div>
                      <p className="text-sm pt-1">Первое прибытие в Африку</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold text-primary">1841</div>
                      <p className="text-sm pt-1">Первое прибытие в Африку</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold text-primary">1855</div>
                      <p className="text-sm pt-1">Открытие водопада Виктория</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold text-primary">1859</div>
                      <p className="text-sm pt-1">Исследование озера Ньяса</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-semibold text-primary">1866</div>
                      <p className="text-sm pt-1">Последняя экспедиция</p>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Галерея фотографий и иллюстраций</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/fe0a7c87-617d-44a7-9175-8f46b88228f8.jpg"
                    alt="Дэвид Ливингстон"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Дэвид Ливингстон</h3>
                    <p className="text-sm text-muted-foreground">Портрет великого исследователя Африки</p>
                  </div>
                </Card>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/b0562dac-dce8-483b-a5cd-93dbaf50115e.jpg"
                    alt="Африканская саванна"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Африканская саванна</h3>
                    <p className="text-sm text-muted-foreground">Пейзажи, которые видел Ливингстон</p>
                  </div>
                </Card>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/c3916d3f-e2b4-49c4-a683-504f35c184e7.jpg"
                    alt="Карта экспедиций"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Карта экспедиций</h3>
                    <p className="text-sm text-muted-foreground">Маршруты великих открытий</p>
                  </div>
                </Card>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Цитаты Ливингстона</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-primary/5 border-l-4 border-primary">
                    <Icon name="Quote" size={32} className="text-primary mb-4" />
                    <p className="italic text-lg mb-4">"Я готов идти куда угодно, лишь бы это было вперёд"</p>
                    <p className="text-sm text-muted-foreground">— Дэвид Ливингстон</p>
                  </Card>
                  <Card className="p-6 bg-primary/5 border-l-4 border-primary">
                    <Icon name="Quote" size={32} className="text-primary mb-4" />
                    <p className="italic text-lg mb-4">"Я оставлю это дело только со своей жизнью"</p>
                    <p className="text-sm text-muted-foreground">— О борьбе с работорговлей</p>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;