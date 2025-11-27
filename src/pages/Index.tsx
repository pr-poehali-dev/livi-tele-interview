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
  { id: 2, text: "Приветствую, путешественник во времени! Мой навигатор — это звезды, солнце и, прости за подробности, мох на деревьях. Но есть один лайфхак покруче: я использую секреты арабских торговцев. Они веками ходили по Сахаре, ориентируясь по ветрам и звездам. Я просто записал их знания, как апгрейнул свой скилл «Выживание». Один старый торговец научил меня находить воду по муравейникам определенного вида. Вот так-то.", isUser: false, delay: 62000, typingDuration: 60000 },
  { id: 3, text: "Обалдеть! А с местными как общаешься? Язык жестов, типа «дай поесть» и «где туалет»? 😂", isUser: true, delay: 65000 },
  { id: 4, text: "Ха! Жесты — это наше всё, но я кое-что знаю. Например, я первым из европейцев подробно описал озеро Ньяса и услышал от местных племен о огромном внутреннем море где-то в центре континента. Все думали, что я прикалываюсь, но это оказалось правдой! Они называли его иначе, но мы его знаем как озеро Виктория. А еще я выучил слово «мбугу» на суахили — так называют антилопу. Попробуй блеснуть знанием на уроке!", isUser: false, delay: 126000, typingDuration: 60000 },
  { id: 5, text: "Крутяк! А с дикими животными часто стычки бывают? Допустим, лев – это же лютый босс. Как от него увернуться?", isUser: true, delay: 129000 },
  { id: 6, text: "Лев – это не босс, это стелс-ниндзя. Однажды один такой чуть не отправил меня в бан, напав сзади. Но знаешь, что страшнее льва? Муха цеце. Вот это настоящий рейд-босс! Она переносит сонную болезнь, от которой нет спасения. Но я открыл миру кое-что важное: болезнь переносится не «плохим воздухом», как все думали, а именно этими мухами. Так что, спасибо моим лихорадкам – они помогли науке!", isUser: false, delay: 190000, typingDuration: 60000 },
  { id: 7, text: "Жесть... А что самое красивое ты видел? Вот прям залипал и забывал про все.", isUser: true, delay: 193000 },
  { id: 8, text: "Водопад, который я назвал Виктория. Местные зовут его «Моси-оа-Тунья» — «Гремящий Дым». Представь: стену воды шириной почти в два километра обрушивается в пропасть с грохотом, который слышен за 40 километров! Брызги поднимаются на 400 метров вверх, их видно как облако за много миль. Это зрелище, ради которого стоит жить. Я был первым европейцем, кто его увидел и описал. Вот мой самый виральный пост, если хочешь.", isUser: false, delay: 254000, typingDuration: 60000 },
  { id: 9, text: "Вау, это же как... IRL-графика на ультра-настройках! А зачем ты вообще все это терпишь? Не думал все забить и вернуться к нормальной жизни?", isUser: true, delay: 257000 },
  { id: 10, text: "Понимаешь, есть вещи поважнее комфорта. Я, например, яростно борюсь с арабской работорговлей. Я видел ужасные вещи: караваны рабов, сломанные судьбы. И я верю, что если проложить торговые пути и показать, что Африка богата не только рабами, но и ресурсами, это зло можно остановить. Каждое мое открытие — это еще один гвоздь в крышку гроба рабства. Вот тебе мой главный лайфхак: если у тебя есть цель больше тебя самого, ты сможешь пережить и лихорадку, и голод.", isUser: false, delay: 318000, typingDuration: 60000 },
  { id: 11, text: "Это мощно... Залип. Получается, ты не просто путешественник, ты – гуманист с компасом. Кстати, о компасе... У тебя там точно нет сигнала? А то я мог бы тебе скинуть парочку видосов, как правильно мапу апдейтить. 😉", isUser: true, delay: 321000 },
  { id: 12, text: "Спасибо, друг! Но мой «интернет» здесь — это шепот саванны, грохот Виктории и мудрость людей, которых я встречаю. И он ни капли не лагает. Цени свой быстрый вай-фай, но не забывай иногда выходить в оффлайн. В мире полно своих «Гремящих Дымов», которые ждут, когда их обнаружат. И помни еще один факт: я открыл не только водопады, но и несколько новых видов растений, включая один род цикламенов, названный в мою честь – «Cyclamen livinstonium». Так что, если увидишь такой цветок – знай, это мой тебе привет через века.", isUser: false, delay: 382000, typingDuration: 60000 },
  { id: 13, text: "Обязательно поищу! Спасибо за все, бро! Ты – настоящий гигачад географии. Если что, ты знаешь, где меня найти. Обнял за монитор! Удачи в пути, первооткрыватель! ✌️ #ЛивингстонЛегенда", isUser: true, delay: 385000 }
];

interface Fact {
  icon: string;
  title: string;
  text: string;
  image: string;
  story: string;
}

const facts: Fact[] = [
  { 
    icon: "Compass", 
    title: "Водопад Виктория", 
    text: "Первый европеец, описавший водопад Моси-оа-Тунья",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/8a3de6da-1616-4e25-9310-38586551e84d.jpg",
    story: "Чувак, представь: ты идёшь по африканскому лесу, жара +40, пот льётся рекой, и вдруг... 🌊 БА-БАХ! Перед тобой СТЕНА воды шириной 2 км рушится вниз с грохотом космического взрыва! 💥 Дэвид стоял с открытым ртом минут 20, не мог слова вымолвить. Местные: «Братан, ну мы ж говорили — Гремящий Дым!» 😅 Он назвал его Виктория в честь королевы, но если б было по-честному, назвал бы «Епта-Как-Это-Вообще-Возможно». Брызги видно за 40 км — это как WhatsApp статус, который весь мир видит! 🌈 Сейчас там селфи делают миллионы, а Дэвид первым сделал «чек-ин» в 1855 году ✅"
  },
  { 
    icon: "Map", 
    title: "Озеро Ньяса", 
    text: "Открыл озеро Ньяса (Малави) - одно из крупнейших в Африке",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/ded959dc-4a6c-4da1-a9f9-9122f30ab411.jpg",
    story: "Окей, слушай эту безумную историю! 🗺️ Дэвид ходил по джунглям месяцами, GPS = 0, Wi-Fi = 0, даже воды нормальной нет. И тут местные: «Бро, иди туда, там озеро огромное есть». Он думал: «Ага, щас, наверное пруд какой-то» 🤔 И БАМ! Выходит на берег озера длиной 560 км! Это как от Москвы до Питера — всё озеро! 😱 Вода такая чистая, что видно дно на 20 метров. Дэвид стоял как вкопанный: «Это же... это же... LAKE OF STARS!» ⭐ (так местные его называли). Он первым нанёс его на карту, представляешь? До него европейцы вообще не знали, что такое СУЩЕСТВУЕТ! Лайк и подписка на его канал «Открытия без Google Maps» 📍"
  },
  { 
    icon: "Bug", 
    title: "Муха цеце", 
    text: "Установил связь между мухой цеце и сонной болезнью",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/d91b687a-ea46-4501-85b9-34f9e7dde46d.jpg",
    story: "Бро, это реально детективная история! 🔍 Люди массово умирали, никто не понимал почему. Все думали: «Ну, плохой воздух, мистика какая-то» 🌫️ А Дэвид заметил паттерн (как истинный аналитик): везде, где люди болеют, летает куча мух цеце. Он такой: «Хм, SUS» 🤨 И начал исследовать. Оказалось, эта муха — настоящий ВАМПИР! Кусает — и всё, ты спишь 24/7, как будто зависаешь в игре навечно 💤 Он описал это в своих отчётах, и позже учёные разработали лекарство! Представь: он спас ТЫСЯЧИ жизней просто благодаря наблюдательности! Это как найти баг в коде, который крашит всю систему 🐛 MVP исследователь! 🏆"
  },
  { 
    icon: "Flower2", 
    title: "Цикламен Ливингстона", 
    text: "В его честь назван род цикламенов - Cyclamen livinstonium",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/8ec5a355-e190-415f-aa00-1b3751fcb507.jpg",
    story: "Окей, а теперь МИЛОТА! 🌸 Представь: брутальный исследователь, который львов гоняет и в джунглях выживает, вдруг останавливается и такой: «Ооо, какой красивый цветочек! 😍» Дэвид находил редкие растения и зарисовывал их в блокнот (как в Инсту, только на бумаге 📔). Один цикламен был настолько уникальным, что учёные решили: «Знаешь что? Назовём его в честь Ливингстона!» 🎉 Cyclamen livingstonium — звучит как название покемона, правда? ✨ Прикинь, у тебя ЦВЕТОК назван твоим именем! Это как именная худи, только круче в 1000 раз 🔥 Каждый раз, когда кто-то видит этот цветок, он вспоминает легенду. Вечная память через природу — вот это я понимаю LEGACY! 👑"
  },
  { 
    icon: "Users", 
    title: "Борьба с рабством", 
    text: "Активно боролся с арабской работорговлей",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/a1afc491-8eb0-4687-b115-d52c473fb5c6.jpg",
    story: "Внимание, это самая МОЩНАЯ часть! 💪 Дэвид видел караваны рабов — людей в цепях, детей, которых разлучали с семьями. И он не смог молчать 😤 Хотя все говорили: «Чел, это бизнес, не лезь», он был как: «НЕТ. ЭТО НЕПРАВИЛЬНО» 🚫 Он писал письма в Британию, показывал фото (ну, рисунки тогда 🖼️), рассказывал истории... Его миссия была проста: показать миру, что Африка — это не «источник рабов», а континент с богатой культурой, ресурсами и ЛЮДЬМИ! 🌍 Он доказывал: торговля слоновой костью, золотом, пряностями выгоднее рабства. И знаешь что? Его работы реально повлияли на отмену рабства! 📜 Настоящий герой без плаща — просто с компасом и огромным сердцем ❤️ Респект на века! 🙌"
  },
  { 
    icon: "Star", 
    title: "Навигация по звездам", 
    text: "Использовал знания арабских торговцев для ориентирования",
    image: "https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/73dd48fe-2229-4dad-912f-de05b59dcbe0.jpg",
    story: "Бро, это МАГИЯ! 🌌 Пока мы палимся в карты Google, Дэвид ориентировался по ЗВЁЗДАМ! ⭐ Он встретил старых арабских торговцев, которые знали секреты навигации, передаваемые веками. Они показали ему: «Видишь ту звезду? Она всегда на севере. А вот эта созвездие — показывает путь к воде» 💧 Дэвид был как губка — впитывал всё! 🧠 Он научился определять время по тени от палки, находить стороны света по мху на деревьях, предсказывать погоду по облакам ☁️ Это как играть в жизнь на хардкоре без читов! 🎮 Однажды он шёл 6 месяцев через пустыню БЕЗ карты, только звёзды + интуиция. И ДОШЁЛ! 🔥 Современные навигаторы на спутниках? Пфф, это для новичков. Дэвид был OG-навигатором, real MVP! 👑"
  }
];

const Index = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingMessages, setTypingMessages] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSlz1e7WgisFHGi47OihUhELTKXh8bllHAU2jdXuyXgpBSF0ye7ajzwJE1+14+uoVhUKSKDi8btsIQUnedXu14IqBSBnt+zop1MRC0yo4PG7ZhwEM4vU78p5KwUfddDu24k4CRNes+XtpFQTCEue4PK8bSEEKnnU7tiDKgUfZrfs6KdTEgtMp+Dxu2YcBDCK1e/Leiv+H3bQ7tuINwkTX7Tl7aVUEwpKn+Dyu2wiBCh50+7Xgyv+H2S37OmnUxILTafi8rpkHQQwiNbu1nosBxt10O7ciDcJE1604+2kVRQLSp7h8rtsIQQnedPu14Iq/x9ktuzpp1MSC0yl4PG7ZR0EL4jV79Z6LAcadL7t3Ic3CRNQN');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

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
        if (!msg.isUser) {
          playNotificationSound();
        }
      }, msg.delay);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="title" className="w-full">
        <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon name="MessageCircle" size={28} className="text-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-foreground">Дэвид Ливингстон</h1>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    онлайн • Africa, 1855
                  </p>
                </div>
              </div>
            </div>
            <TabsList className="w-full justify-start bg-card/50 border-t border-border rounded-none h-12">
              <TabsTrigger value="title" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Переписка
              </TabsTrigger>
              <TabsTrigger value="facts" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Icon name="Lightbulb" size={16} className="mr-2" />
                Факты
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Icon name="Map" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
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
                <h1 className="text-5xl md:text-7xl font-bold text-primary animate-slide-up bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Переписка в Телеграм
                </h1>
                <h2 className="text-3xl md:text-4xl font-medium animate-slide-up text-foreground" style={{ animationDelay: '0.2s' }}>
                  с Дэвидом Ливингстоном
                </h2>
              </div>
              
              <div className="max-w-2xl space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-xl text-muted-foreground">
                  «Онлайн-конференция с первооткрывателем:<br />От Виктории до Цикламенов»
                </p>
                <div className="flex items-center justify-center gap-2 text-lg text-foreground">
                  <Icon name="Sparkles" size={20} className="text-primary" />
                  <span>Интерактивная образовательная презентация</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Card className="p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105 bg-card/50 backdrop-blur border-border/50">
                  <Icon name="MessageCircle" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-foreground">Живая переписка</h3>
                  <p className="text-sm text-muted-foreground">Диалог с первооткрывателем в формате современного мессенджера</p>
                </Card>
                <Card className="p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105 bg-card/50 backdrop-blur border-border/50">
                  <Icon name="Map" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-foreground">Карта открытий</h3>
                  <p className="text-sm text-muted-foreground">Маршруты легендарных экспедиций по Африке</p>
                </Card>
                <Card className="p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105 bg-card/50 backdrop-blur border-border/50">
                  <Icon name="Lightbulb" size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-foreground">Интересные факты</h3>
                  <p className="text-sm text-muted-foreground">Удивительные открытия и достижения исследователя</p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur border-border/50">
              <div className="bg-card/80 backdrop-blur border-b border-border p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Дэвид Ливингстон</h2>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      в сети • Africa, 1855
                    </p>
                  </div>
                </div>
                {!isAnimating && (
                  <Button 
                    onClick={startAnimation}
                    className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                    size="sm"
                  >
                    <Icon name="Play" size={16} />
                    Начать диалог
                  </Button>
                )}
              </div>
              
              <div className="h-[600px] overflow-y-auto p-4 space-y-4 bg-background/50">
                {messages
                  .filter(msg => visibleMessages.includes(msg.id))
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div className={`message-bubble ${msg.isUser ? 'message-user shadow-primary/20' : 'message-contact'}`}>
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
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 bg-card/80 backdrop-blur border-t border-border flex items-center gap-3">
                <Icon name="Paperclip" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <div className="flex-1 bg-background/50 rounded-full px-4 py-2 text-sm text-muted-foreground border border-border/50">
                  Напишите сообщение...
                </div>
                <Icon name="Mic" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="facts" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Интересные факты об открытиях</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facts.map((fact, index) => (
                  <Card 
                    key={index} 
                    className="p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105 cursor-pointer bg-card/50 backdrop-blur border-border/50 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedFact(fact)}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50">
                        <Icon name={fact.icon as any} size={32} className="text-primary" />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">{fact.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fact.text}</p>
                      <Button variant="outline" size="sm" className="gap-2 border-primary/50 hover:bg-primary/10">
                        <Icon name="ChevronRight" size={16} />
                        Узнать больше
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Карта путешествий Ливингстона</h2>
              <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
                <img 
                  src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/c3916d3f-e2b4-49c4-a683-504f35c184e7.jpg"
                  alt="Карта путешествий Дэвида Ливингстона"
                  className="w-full h-auto"
                />
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-foreground">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    Ключевые точки маршрута
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-primary/30">1</div>
                      <div>
                        <p className="font-semibold text-foreground">Водопад Виктория</p>
                        <p className="text-sm text-muted-foreground">Моси-оа-Тунья - Гремящий Дым</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-primary/30">2</div>
                      <div>
                        <p className="font-semibold text-foreground">Озеро Ньяса</p>
                        <p className="text-sm text-muted-foreground">Одно из Великих Африканских озер</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-primary/30">3</div>
                      <div>
                        <p className="font-semibold text-foreground">Озеро Виктория</p>
                        <p className="text-sm text-muted-foreground">Крупнейшее озеро Африки</p>
                      </div>
                    </li>
                  </ul>
                </Card>
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-foreground">
                    <Icon name="Calendar" size={24} className="text-primary" />
                    Временная шкала экспедиций
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30">1841</div>
                      <p className="text-sm pt-1 text-foreground">Первое прибытие в Африку</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30">1855</div>
                      <p className="text-sm pt-1 text-foreground">Открытие водопада Виктория</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30">1859</div>
                      <p className="text-sm pt-1 text-foreground">Исследование озера Ньяса</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 px-3 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30">1866</div>
                      <p className="text-sm pt-1 text-foreground">Последняя экспедиция</p>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Галерея фотографий и иллюстраций</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all bg-card/50 backdrop-blur border-border/50">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/fe0a7c87-617d-44a7-9175-8f46b88228f8.jpg"
                    alt="Дэвид Ливингстон"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">Дэвид Ливингстон</h3>
                    <p className="text-sm text-muted-foreground">Портрет великого исследователя Африки</p>
                  </div>
                </Card>
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all bg-card/50 backdrop-blur border-border/50">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/b0562dac-dce8-483b-a5cd-93dbaf50115e.jpg"
                    alt="Африканская саванна"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">Африканская саванна</h3>
                    <p className="text-sm text-muted-foreground">Пейзажи, которые видел Ливингстон</p>
                  </div>
                </Card>
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all bg-card/50 backdrop-blur border-border/50">
                  <img 
                    src="https://cdn.poehali.dev/projects/ca7a1608-078e-4156-9796-6b9f38f88193/files/c3916d3f-e2b4-49c4-a683-504f35c184e7.jpg"
                    alt="Карта экспедиций"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">Карта экспедиций</h3>
                    <p className="text-sm text-muted-foreground">Маршруты великих открытий</p>
                  </div>
                </Card>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Цитаты Ливингстона</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-primary/5 border-l-4 border-primary backdrop-blur">
                    <Icon name="Quote" size={32} className="text-primary mb-4" />
                    <p className="italic text-lg mb-4 text-foreground">"Я готов идти куда угодно, лишь бы это было вперёд"</p>
                    <p className="text-sm text-muted-foreground">— Дэвид Ливингстон</p>
                  </Card>
                  <Card className="p-6 bg-primary/5 border-l-4 border-primary backdrop-blur">
                    <Icon name="Quote" size={32} className="text-primary mb-4" />
                    <p className="italic text-lg mb-4 text-foreground">"Я оставлю это дело только со своей жизнью"</p>
                    <p className="text-sm text-muted-foreground">— О борьбе с работорговлей</p>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {selectedFact && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-slide-up"
          onClick={() => setSelectedFact(null)}
        >
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedFact.image}
                alt={selectedFact.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <Button 
                onClick={() => setSelectedFact(null)}
                className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground"
                size="icon"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50">
                  <Icon name={selectedFact.icon as any} size={32} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{selectedFact.title}</h2>
                  <p className="text-muted-foreground">{selectedFact.text}</p>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">{selectedFact.story}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
