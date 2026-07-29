# Talk Track — Quiz de Inglês A1-A2

Ferramenta de prática de **inglês conversacional básico** (A1-A2):
foco em construir frases simples, interpretar pequenos diálogos e
escolher/produzir respostas adequadas para situações reais do dia a
dia — cumprimentar, pedir e dar informações, marcar horários, lidar
com pequenos imprevistos, atender e orientar pessoas, entre outras.
Serve tanto para quem está começando a estudar inglês quanto como
autoavaliação rápida de nível.

## Natureza e tipos de questão

30 questões no total, divididas em dois formatos:

- **27 questões de múltipla escolha**, com três estilos diferentes
  (misturados de propósito, para treinar habilidades distintas):
  - **Palavra-chave** — completar uma lacuna com o termo certo
    (ex.: preposição, verbo, pronome).
  - **Frase completa** — escolher, entre 4 frases inteiras, a
    resposta mais natural/adequada para a situação do diálogo.
  - **Interpretação** — ler uma pequena interação e identificar o
    que está sendo comunicado (intenção, pedido, decisão).
- **3 questões dissertativas**, sem validação automática: o usuário
  escreve a própria resposta em inglês e, ao clicar em "Ver resposta
  esperada", vê um exemplo de resposta correta e outras formas
  aceitáveis, com uma dica de contexto.

Cada questão de múltipla escolha traz uma explicação curta após a
resposta, e o resultado final estima um nível (A1 iniciante → A2
avançado) com base no percentual de acertos das questões objetivas.

## Tecnologias usadas

- **HTML5, CSS3 e JavaScript puro (Vanilla JS)** — sem frameworks,
  sem build, sem dependências externas de runtime.
- **Arquitetura MVC** implementada manualmente com classes ES6
  (`QuizModel`, `QuizView`, `QuizController`).
- **Google Fonts** (Fraunces + Inter) via CDN.
- **CSS custom properties** para o sistema de light/dark mode.
- **localStorage** apenas para lembrar a preferência de tema entre
  visitas (nenhum outro dado é salvo ou enviado a servidores).
- **GitHub Pages** para hospedagem estática.

## Como acessar

O quiz já está publicado e pode ser usado diretamente pelo link:

🔗 **https://jovemog-dev.github.io/quiz-ingles-A1/**

Não é necessário instalar nada — funciona em qualquer navegador
moderno, desktop ou mobile.

## Arquitetura (MVC)

- **Model** (`js/models/QuizModel.js`): estado do quiz (pergunta
  atual, respostas dadas, pontuação) e a regra de validação das
  respostas de múltipla escolha. Não conhece o DOM.
- **View** (`js/views/QuizView.js`): só renderiza — desenha telas,
  progresso, opções, área de resposta dissertativa e feedback. Não
  decide se algo está certo.
- **Controller** (`js/controllers/QuizController.js`): liga as duas
  camadas, escuta cliques/eventos, chama o Model e manda a View
  atualizar.
- **Dados** (`js/data/questions.js`): as 30 perguntas, separadas do
  Model para facilitar edição/expansão do banco de questões.

## Rodando localmente

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer
servidor estático, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Publicando no GitHub Pages

1. Envie todos os arquivos deste projeto para a branch `main` do
   repositório.
2. No repositório, vá em **Settings → Pages**.
3. Em **Build and deployment → Source**, selecione **Deploy from a
   branch**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Salve. Em alguns minutos o site fica disponível na URL do GitHub
   Pages do repositório.

Não é necessário nenhum passo de build — os arquivos já estão prontos
para produção.

## Personalizando

- **Adicionar/editar perguntas**: edite o array `QUESTIONS` em
  `js/data/questions.js`. Todo item tem `type` ("mc" ou "open"),
  `category`, `question` e, opcionalmente, `dialogue` (linha de
  contexto de outra pessoa).
  - Para `type: "mc"`: `options` (4 alternativas — podem ser palavras
    ou frases completas), `answer` (índice 0-3) e `explanation`.
  - Para `type: "open"`: `placeholder`, `exampleAnswer`,
    `acceptableAnswers` (array de respostas alternativas aceitáveis)
    e `tip`.
- **Cores/tema**: variáveis CSS no topo de `css/styles.css`, em
  `:root` (tema claro) e `:root[data-theme="dark"]` (tema escuro).
