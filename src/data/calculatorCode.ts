/**
 * Códigos Python em diferentes níveis didáticos para iniciantes
 * e dados explicativos dos componentes.
 */

export interface CodeLevel {
  id: 'basic' | 'functions' | 'advanced';
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
}

export const CODE_LEVELS: CodeLevel[] = [
  {
    id: 'functions',
    title: 'Nível Recomendado: Funções def',
    badge: 'Recomendado para Iniciantes',
    description: 'Código modular e organizado dividindo cada operação matemática em sua própria função reutilizável.',
    filename: 'calculadora_funcoes.py',
    code: `# ==========================================
# CALCULADORA BÁSICA EM PYTHON
# Feita para iniciantes na programação
# ==========================================

# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do primeiro pelo segundo número."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto da multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão do primeiro número pelo segundo.
    Verifica se o divisor é zero para evitar erro."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. MENU PRINCIPAL DE OPÇÕES
def mostrar_menu():
    print("\\n--- CALCULADORA EM PYTHON ---")
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")

# 3. PROGRAMA PRINCIPAL
def calculadora():
    mostrar_menu()
    
    # Recebe a escolha do usuário
    opcao = input("Escolha uma opção (1/2/3/4/5): ")

    if opcao == '5':
        print("Calculadora encerrada. Até a próxima!")
        return

    # Valida se a opção está entre as válidas
    if opcao in ['1', '2', '3', '4']:
        # Coleta os dois números e converte de texto para decimal (float)
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Erro: Por favor, digite apenas números válidos!")
            return

        # Executa a operação correspondente
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"\\nResultado: {num1} + {num2} = {resultado}")
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\\nResultado: {num1} - {num2} = {resultado}")
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\\nResultado: {num1} * {num2} = {resultado}")
        elif opcao == '4':
            resultado = dividir(num1, num2)
            print(f"\\nResultado: {num1} / {num2} = {resultado}")
    else:
        print("Opção inválida! Escolha um número de 1 a 5.")

# Executa a função principal
if __name__ == "__main__":
    calculadora()`
  },
  {
    id: 'basic',
    title: 'Nível 1: Direto e Sequencial',
    badge: 'Mais Simples Possível',
    description: 'Sem funções customizadas. Executa linha após linha de forma linear para quem está no primeiro dia de código.',
    filename: 'calculadora_simples.py',
    code: `# ==========================================
# CALCULADORA SEQUENCIAL SIMPLES
# O código mais direto para o primeiro dia de Python
# ==========================================

print("=== CALCULADORA SIMPLES ===")
print("Operações disponíveis: +, -, *, /")

# 1. Coleta os dois números do usuário
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

# 2. Estrutura de decisão (if / elif / else)
if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")
elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")
elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")
elif operacao == "/":
    if num2 == 0:
        print("Erro: Divisão por zero não é permitida!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
else:
    print("Operação inválida! Use apenas +, -, * ou /.")`
  },
  {
    id: 'advanced',
    title: 'Nível 3: Loop Contínuo & Robusto',
    badge: 'Completo e Robusto',
    description: 'Com loop while True para fazer várias contas consecutivas e tratamento de exceções completo.',
    filename: 'calculadora_completa.py',
    code: `# ==========================================
# CALCULADORA COM LOOP CONTÍNUO E VALIDAÇÃO
# Não fecha após uma conta e trata erros de digitação
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return None  # Indica erro de divisão por zero
    return a / b

def ler_numero(mensagem):
    """Pede um número e insiste até o usuário digitar um valor válido."""
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("❌ Entrada inválida! Por favor, digite um número.")

def main():
    while True:
        print("\\n" + "=" * 32)
        print("     CALCULADORA PYTHON")
        print("=" * 32)
        print(" [1] Adição (+)")
        print(" [2] Subtração (-)")
        print(" [3] Multiplicação (*)")
        print(" [4] Divisão (/)")
        print(" [0] Sair do Programa")
        print("=" * 32)

        opcao = input("Selecione uma opção: ").strip()

        if opcao == "0":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ["1", "2", "3", "4"]:
            print("⚠️ Opção inválida! Escolha entre 0 e 4.")
            continue

        num1 = ler_numero("Digite o primeiro número: ")
        num2 = ler_numero("Digite o segundo número: ")

        if opcao == "1":
            print(f"✅ Resultado: {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == "2":
            print(f"✅ Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == "3":
            print(f"✅ Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == "4":
            res = dividir(num1, num2)
            if res is None:
                print("❌ Erro Matemático: Impossível dividir por zero!")
            else:
                print(f"✅ Resultado: {num1} / {num2} = {res}")

if __name__ == "__main__":
    main()`
  }
];

export interface ComponentExplanation {
  id: string;
  title: string;
  pythonConcept: string;
  summary: string;
  whyImportant: string;
  codeSnippet: string;
  beginnerMistake: string;
  tip: string;
}

export const COMPONENT_EXPLANATIONS: ComponentExplanation[] = [
  {
    id: 'functions',
    title: 'Funções (def e return)',
    pythonConcept: 'def somar(a, b): return a + b',
    summary: 'Uma função é como uma pequena receita ou máquina especializada. Você dá ingredientes (parâmetros a e b), ela faz o cálculo e entrega o resultado com o comando return.',
    whyImportant: 'Em vez de reescrever a mesma conta várias vezes no programa, você cria uma função uma única vez e pode chamá-la de qualquer lugar quando precisar.',
    codeSnippet: `def somar(a, b):
    # 'a' e 'b' são os parâmetros (os dois números recebidos)
    resultado = a + b
    return resultado  # 'return' devolve o valor para quem chamou`,
    beginnerMistake: 'Esquecer o return ou confundir return com print(). O print apenas exibe na tela, enquanto o return permite guardar o resultado em outra variável para continuar calculando.',
    tip: 'Lembre-se sempre dos dois pontos (:) no final do def e de indentar (dar 4 espaços) as linhas de dentro da função.'
  },
  {
    id: 'input-float',
    title: 'Entrada de Dados (input) e Conversão (float)',
    pythonConcept: 'num = float(input("Digite: "))',
    summary: 'A função input() escuta o que você digita no teclado. Porém, ela SEMPRE devolve o que foi digitado como texto (string). A função float() transforma esse texto em um número decimal real.',
    whyImportant: 'Se você não converter com float(), o Python fará "5" + "3" virar "53" (concatenação de texto) em vez de somar matematicamente gerando 8!',
    codeSnippet: `# Exemplo correto:
texto = input("Digite um número: ")  # Se digitar 10, texto vale "10"
numero = float(texto)                # Agora vale 10.0 (número real)

# Forma direta e prática muito usada:
num1 = float(input("Digite o primeiro número: "))`,
    beginnerMistake: 'Tentar somar direto o input(): "num1 = input() + input()". Isso apenas cola um texto no outro!',
    tip: 'Usamos float() em vez de int() porque calculadoras devem aceitar números com casas decimais (ex: 2.5, 0.75, 10.0).'
  },
  {
    id: 'conditionals',
    title: 'Estruturas Condicionais (if / elif / else)',
    pythonConcept: 'if opcao == "1": ... elif: ... else:',
    summary: 'Permite ao computador tomar decisões com base em comparações lógicas. O programa avalia qual opção o usuário escolheu e roda apenas o bloco de código correspondente.',
    whyImportant: 'É o "cérebro" da calculadora. Sem condições, o programa não saberia se você quer somar, subtrair, multiplicar ou dividir.',
    codeSnippet: `if opcao == '1':
    resultado = somar(num1, num2)
elif opcao == '2':
    resultado = subtrair(num1, num2)
elif opcao == '3':
    resultado = multiplicar(num1, num2)
elif opcao == '4':
    resultado = dividir(num1, num2)
else:
    print("Opção inválida!")`,
    beginnerMistake: 'Usar apenas um sinal de igual (=) para comparar. No Python, um igual (=) serve para atribuir valor (x = 5), enquanto dois iguais (==) servem para testar igualdade (se x == 5).',
    tip: 'elif é a contração de "else if" (senão se). Ele só é testado se os testes anteriores tiverem dado falso.'
  },
  {
    id: 'zero-division',
    title: 'Prevenção da Divisão por Zero',
    pythonConcept: 'if b == 0: return "Erro"',
    summary: 'Na matemática, dividir qualquer número por 0 é uma operação indefinida. Se o Python tentar fazer 10 / 0, ele trava o programa com um erro fatal chamado ZeroDivisionError.',
    whyImportant: 'Programas de qualidade devem ser à prova de falhas do usuário. Uma verificação simples antes da conta garante que o programa continue rodando normalmente.',
    codeSnippet: `def dividir(a, b):
    # Antes de dividir, checamos se o divisor é zero
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b`,
    beginnerMistake: 'Deixar o cálculo a / b acontecer diretamente sem testar se b é zero, fazendo o programa fechar com mensagem em vermelho no terminal.',
    tip: 'Sempre faça a validação defensiva antes de executar a operação crítica.'
  },
  {
    id: 'f-strings',
    title: 'Formatação Elegante com f-strings',
    pythonConcept: 'print(f"Resultado: {num1} + {num2} = {resultado}")',
    summary: 'As f-strings (format strings) são a forma mais moderna, rápida e legível do Python para juntar textos fixos com valores de variáveis dinâmicas.',
    whyImportant: 'Antes do Python 3.6, era preciso usar sintaxes complicadas como "Resultado: " + str(num1) + " + "... Com f-strings, você só coloca um f antes das aspas e o nome da variável entre chaves {}.',
    codeSnippet: `a = 15
b = 4
resultado = a + b

# Veja como é limpo e direto:
print(f"A soma de {a} com {b} é igual a {resultado}.")
# Saída: A soma de 15 com 4 é igual a 19.`,
    beginnerMistake: 'Esquecer da letrinha f antes da primeira aspa. Sem o f, o Python imprime literalmente as chaves com o nome da variável ({resultado}).',
    tip: 'Você pode até fazer contas e arredondamentos direto dentro da f-string: {resultado:.2f} mostra o número com apenas 2 casas decimais!'
  },
  {
    id: 'indentation',
    title: 'Indentação (A Regra dos 4 Espaços)',
    pythonConcept: '4 espaços para blocos internos',
    summary: 'Enquanto outras linguagens usam chaves { } para agrupar comandos, o Python usa o alinhamento visual (espaçamento) no início de cada linha.',
    whyImportant: 'Tudo o que estiver recuado 4 espaços para a direita faz parte daquele bloco (da função, do if, ou do loop). Quando o recuo volta para a esquerda, o bloco termina.',
    codeSnippet: `def minha_funcao():
    # Estas duas linhas estão DENTRO da função (recuadas)
    x = 10
    return x

# Esta linha está FORA da função (alinhada à esquerda)
print("Código fora da função")`,
    beginnerMistake: 'Misturar a tecla Tab com a barra de Espaço, ou deixar uma linha com 3 espaços e outra com 4, gerando o famoso erro IndentationError.',
    tip: 'Configure seu editor (como VS Code) para que a tecla Tab insira automaticamente 4 espaços.'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Por que precisamos usar float(input()) ao ler um número na calculadora?',
    options: [
      'Porque o input() sempre devolve o texto digitado (string), e precisamos convertê-lo em número decimal.',
      'Porque o Python não aceita números inteiros em programas interativos.',
      'Porque float() faz o computador calcular mais rápido.',
      'Apenas por questão estética, não tem efeito prático no cálculo.'
    ],
    correctIndex: 0,
    explanation: 'Correto! A função input() sempre lê dados do teclado como texto (string). Se digitarmos 5 e 3 sem converter, o sinal de "+" concatenará os textos gerando "53" em vez da soma matemática 8.'
  },
  {
    id: 2,
    question: 'Qual é a diferença fundamental entre "return" e "print()" dentro de uma função?',
    options: [
      'Não há diferença, ambos fazem a mesma coisa.',
      'O print() apenas mostra texto na tela, enquanto o return entrega o valor para ser guardado ou reutilizado no código.',
      'O return fecha o Python imediatamente.',
      'O print() só funciona com números inteiros.'
    ],
    correctIndex: 1,
    explanation: 'Exato! O comando print() apenas cospe a informação na tela do terminal. Já o return devolve o dado para quem chamou a função, permitindo que você guarde o resultado em uma variável ou passe para outro cálculo.'
  },
  {
    id: 3,
    question: 'O que acontece em Python se tentarmos executar "10 / 0" sem nenhuma validação prévia?',
    options: [
      'O resultado será automaticamente infinito (Inf).',
      'O Python arredonda para zero.',
      'O programa é interrompido com um erro fatal ZeroDivisionError.',
      'O Python desliga o computador.'
    ],
    correctIndex: 2,
    explanation: 'Muito bem! Em Python, dividir por zero lança uma exceção ZeroDivisionError que quebra a execução do script. Por isso, checamos antes com "if b == 0:" para responder com elegância.'
  },
  {
    id: 4,
    question: 'Qual operador da linguagem Python é utilizado para verificar IGUALDADE em uma condição (if)?',
    options: [
      '= (um sinal de igual)',
      '== (dois sinais de igual consecutivos)',
      ':= (dois pontos e igual)',
      'equals()'
    ],
    correctIndex: 1,
    explanation: 'Perfeito! No Python, um igual (=) serve para atribuir um valor a uma variável (ex: x = 10). Para testar se dois valores são iguais dentro de um if, usamos sempre o operador duplo == (ex: if opcao == "1":).'
  }
];
