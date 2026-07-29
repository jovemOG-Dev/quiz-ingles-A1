/**
 * Banco de questões do quiz.
 *
 * Cada questão tem um "type":
 *   - "mc"   -> múltipla escolha (as opções podem ser palavras-chave
 *               curtas OU frases completas — a variedade é proposital)
 *   - "open" -> dissertativa. Sem validação automática: o usuário
 *               escreve a resposta e depois vê um "gabarito" com um
 *               exemplo de resposta e outras formas aceitáveis.
 *
 * Campos comuns: category, dialogue (opcional), question
 * Campos de "mc": options (array), answer (índice 0-3), explanation
 * Campos de "open": placeholder, exampleAnswer, acceptableAnswers (array), tip
 */
const QUESTIONS = [
  {
    type: "mc",
    category: "Recepção",
    dialogue: "Visitor: Good morning! I have an appointment with Ms. Costa.",
    question: "Receptionist: Good morning! ___ a seat, please.",
    options: ["Have", "Take", "Do", "Make"],
    answer: 1,
    explanation: "'Take a seat' é a forma comum de convidar alguém a sentar."
  },
  {
    type: "mc",
    category: "Recepção",
    dialogue: "Visitor: Excuse me, where is the meeting room?",
    question: "What should the receptionist say?",
    options: [
      "It's on the second floor, next to the elevator.",
      "I not know where is.",
      "You go there and there.",
      "Meeting room is what?"
    ],
    answer: 0,
    explanation: "A resposta deve ser clara, no presente simples e educada."
  },
  {
    type: "mc",
    category: "Recepção",
    dialogue: "Visitor: Can I use the restroom?",
    question: "Receptionist: Sure, it's ___ the hallway, on the left.",
    options: ["in", "at", "on", "down"],
    answer: 3,
    explanation: "'Down the hallway' = ao longo do corredor."
  },
  {
    type: "mc",
    category: "Telefone",
    dialogue: "Caller: Hello, is Mr. Lima available?",
    question: "What's the best professional reply?",
    options: [
      "One moment, please. I'll transfer your call.",
      "He no here now.",
      "Wait, wait, wait!",
      "I don't know him."
    ],
    answer: 0,
    explanation: "Resposta educada e profissional para transferir a ligação."
  },
  {
    type: "mc",
    category: "Small talk",
    dialogue: "A: How was your flight?",
    question: "B: It ___ good, thanks.",
    options: ["was", "is", "be", "were"],
    answer: 0,
    explanation: "Passado simples do verbo 'to be' para responder sobre algo que já aconteceu: 'was'."
  },
  {
    type: "mc",
    category: "Interpretação",
    dialogue: "Customer: I've been waiting for 20 minutes already!",
    question: "What is the customer expressing?",
    options: [
      "They are happy with the service.",
      "They are frustrated about the wait.",
      "They want to leave a compliment.",
      "They are asking for directions."
    ],
    answer: 1,
    explanation: "O tom e a frase indicam frustração com o tempo de espera."
  },
  {
    type: "mc",
    category: "Atendimento",
    dialogue: "Customer: I've been waiting for 20 minutes already!",
    question: "What's an appropriate response?",
    options: [
      "I'm sorry for the delay. Let me check that for you.",
      "Not my problem.",
      "You wait more, ok?",
      "Why you wait?"
    ],
    answer: 0,
    explanation: "Pedir desculpas e agir são atitudes profissionais adequadas."
  },
  {
    type: "mc",
    category: "Direções",
    dialogue: "Visitor: Where is the elevator?",
    question: "Employee: It's ___ the end of the hall.",
    options: ["at", "in", "on", "to"],
    answer: 0,
    explanation: "'At the end of the hall' = no final do corredor."
  },
  {
    type: "mc",
    category: "Direções",
    dialogue: "A: How do I get to the parking lot?",
    question: "B: Go ___ the stairs and turn right.",
    options: ["down", "up", "on", "at"],
    answer: 0,
    explanation: "'Go down the stairs' = descer as escadas."
  },
  {
    type: "mc",
    category: "Oferecendo ajuda",
    dialogue: "Visitor: I'm looking for the HR department.",
    question: "What should you say?",
    options: [
      "I can take you there, follow me please.",
      "I no know HR.",
      "HR is not here, sorry, bye.",
      "Go alone, find it."
    ],
    answer: 0,
    explanation: "Oferecer ajuda de forma clara e educada."
  },
  {
    type: "mc",
    category: "Oferecendo algo",
    dialogue: "A: Would you like something to drink?",
    question: "B: Yes, ___ coffee, please.",
    options: ["some", "a", "an", "any"],
    answer: 1,
    explanation: "'A coffee' (uma xícara de café) é contável nesse contexto."
  },
  {
    type: "mc",
    category: "Small talk",
    dialogue: "A: Is this your first time here?",
    question: "B: Yes, it ___.",
    options: ["is", "does", "was", "has"],
    answer: 0,
    explanation: "Resposta curta: 'Yes, it is.'"
  },
  {
    type: "open",
    category: "Small talk",
    question: "How do you usually introduce yourself to someone you're meeting for the first time?",
    placeholder: "Ex: Hi, my name is...",
    exampleAnswer: "Hi, my name is Ana. I work in the sales department. Nice to meet you.",
    acceptableAnswers: [
      "Hello, I'm ... and I work at ...",
      "Hi, my name is ..., nice to meet you.",
      "Good morning, I'm ... from the ... team."
    ],
    tip: "Não existe só uma resposta certa — o importante é cumprimentar, dizer seu nome e ser educado."
  },
  {
    type: "mc",
    category: "Agenda",
    dialogue: "Visitor: I have a 3 p.m. appointment, but I'm a bit early.",
    question: "What can you say?",
    options: [
      "No problem, please have a seat. I'll let them know you're here.",
      "You early, go away.",
      "3 p.m. is 3 p.m., wait outside.",
      "I don't care."
    ],
    answer: 0,
    explanation: "Resposta acolhedora e profissional para quem chega adiantado."
  },
  {
    type: "mc",
    category: "Clima",
    dialogue: "A: What's the weather like today?",
    question: "B: It's ___ sunny.",
    options: ["very", "much", "too much", "so much"],
    answer: 0,
    explanation: "'Very sunny' = muito ensolarado."
  },
  {
    type: "mc",
    category: "Interpretação",
    dialogue: "Customer: This is the third time I've called about the same issue.",
    question: "What does the customer want?",
    options: [
      "A quick chat about the weather.",
      "The issue to finally be solved.",
      "To cancel the appointment.",
      "To say goodbye."
    ],
    answer: 1,
    explanation: "A frase indica que o cliente quer que o problema seja resolvido."
  },
  {
    type: "mc",
    category: "Atendimento",
    question: "Choose the most professional response to a frustrated customer:",
    options: [
      "I understand your frustration. Let me help you solve this now.",
      "Calm down, it's not a big deal.",
      "That's not my department, bye.",
      "You always complain."
    ],
    answer: 0,
    explanation: "Reconhecer o sentimento do cliente e agir demonstra empatia profissional."
  },
  {
    type: "mc",
    category: "Agradecimentos",
    dialogue: "A: Thank you so much for your help!",
    question: "B: You're ___!",
    options: ["welcome", "please", "thanks", "sorry"],
    answer: 0,
    explanation: "'You're welcome!' é a resposta padrão para um agradecimento."
  },
  {
    type: "mc",
    category: "Oferecendo algo",
    dialogue: "A: Can I get you anything? Water, coffee?",
    question: "B: Just water, ___ you.",
    options: ["thank", "thanks", "please", "welcome"],
    answer: 0,
    explanation: "'Thank you' (por extenso) depois de 'Just water,'."
  },
  {
    type: "mc",
    category: "Confirmando informação",
    dialogue: "Visitor: Is this the right floor for the marketing department?",
    question: "What's the correct reply if it's NOT the right floor?",
    options: [
      "No, marketing is on the 4th floor. Let me show you.",
      "No, no, no, wrong, wrong.",
      "Maybe, maybe not, who knows.",
      "Not marketing, not here, sorry bye."
    ],
    answer: 0,
    explanation: "Correção educada, clara e com oferta de ajuda."
  },
  {
    type: "mc",
    category: "Pedindo para esperar",
    dialogue: "A: Can I speak to the manager?",
    question: "B: Sure, could you ___ here for a moment?",
    options: ["wait", "waiting", "waits", "waited"],
    answer: 0,
    explanation: "Depois de 'could you', o verbo fica no infinitivo sem 'to': 'wait'."
  },
  {
    type: "mc",
    category: "Horas",
    dialogue: "A: What time does the meeting start?",
    question: "B: It starts ___ 10 a.m.",
    options: ["in", "on", "at", "to"],
    answer: 2,
    explanation: "Usamos 'at' antes de horários específicos: 'at 10 a.m.'"
  },
  {
    type: "mc",
    category: "Interpretação",
    dialogue: "Employee: Please sign here and take a visitor badge before going up.",
    question: "What does the visitor need to do first?",
    options: [
      "Go straight to the meeting.",
      "Sign in and get a badge.",
      "Leave the building.",
      "Call the manager."
    ],
    answer: 1,
    explanation: "A instrução pede para assinar e pegar o crachá antes de subir."
  },
  {
    type: "mc",
    category: "Despedida",
    dialogue: "Visitor: Thanks for your time. I have to go now.",
    question: "What's a polite way to say goodbye?",
    options: [
      "It was a pleasure. Have a safe trip!",
      "Bye bye go go.",
      "Ok, whatever.",
      "See you never."
    ],
    answer: 0,
    explanation: "Despedida cordial e profissional."
  },
  {
    type: "mc",
    category: "Pedindo desculpas",
    dialogue: "A: Sorry, I'm a little late.",
    question: "B: That's ___.",
    options: ["okay", "ok fine", "no problem thanks", "welcome"],
    answer: 0,
    explanation: "'That's okay' é uma resposta simples e comum a um pedido de desculpas."
  },
  {
    type: "open",
    category: "Atendimento",
    question: "A visitor asks you for directions to the bathroom, but you're not sure where it is. What do you say?",
    placeholder: "Ex: I'm sorry, I'm not sure. Let me ask someone.",
    exampleAnswer: "I'm sorry, I'm not sure, but let me find out for you.",
    acceptableAnswers: [
      "I'm not sure, let me check.",
      "Sorry, I don't know, but I'll ask someone.",
      "One moment, I'll find out for you."
    ],
    tip: "O importante é ser honesto, educado e oferecer ajuda mesmo sem saber a resposta na hora."
  },
  {
    type: "mc",
    category: "Small talk",
    dialogue: "A: Do you have brothers or sisters?",
    question: "B: Yes, I ___ one brother.",
    options: ["am", "have", "has", "do"],
    answer: 1,
    explanation: "Posse usa o verbo 'have': 'I have one brother.'"
  },
  {
    type: "mc",
    category: "Compras",
    dialogue: "Shop assistant: Can I help you find anything?",
    question: "What can the customer say?",
    options: [
      "Yes, I'm looking for a jacket, size medium.",
      "No help, I go alone.",
      "Jacket where, you tell.",
      "I want but no."
    ],
    answer: 0,
    explanation: "Frase clara e completa para pedir ajuda em uma loja."
  },
  {
    type: "mc",
    category: "Interpretação",
    dialogue: "A: Let's meet at 6 p.m. tomorrow. B: Sounds good, see you then!",
    question: "What did B agree to?",
    options: [
      "To cancel the meeting.",
      "To meet at 6 p.m. tomorrow.",
      "To meet next week instead.",
      "To call instead of meeting."
    ],
    answer: 1,
    explanation: "'Sounds good, see you then!' confirma o horário combinado."
  },
  {
    type: "open",
    category: "Recepção",
    question: "How would you welcome someone visiting your workplace for the first time?",
    placeholder: "Ex: Welcome! It's great to have you here.",
    exampleAnswer: "Welcome! It's a pleasure to have you here. Please, follow me.",
    acceptableAnswers: [
      "Welcome to our office! Let me show you around.",
      "Hello and welcome! How was your trip?",
      "Welcome! Please make yourself comfortable."
    ],
    tip: "Frases de boas-vindas costumam ter um cumprimento caloroso e um convite para a pessoa se sentir à vontade."
  }
];