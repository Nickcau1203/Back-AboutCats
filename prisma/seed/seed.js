import 'use client';
import { PrismaClient } from '@prisma/client';
import { racas } from './racasData';

// 1. Importe o Prisma Client e a lista de dados
const { PrismaClient } = requires('@prisma/client');
const prisma = new PrismaClient();

// A lista de raças que você forneceu, sem o "use client"
const racas = [
    {
        nome: "Siamês",
        descricao: "A aparência de um gato Siamês é o que mais chama atenção: olhos bem azuis e pelos claros com extremidades mais escuras (rosto, orelhas, patas e rabo). Com postura elegante, esta raça era comum em companhias para reis na Tailândia. Já o temperamento da raça de gato Siamês pode ser imprevisível. Na maioria das vezes, são tranquilos, amáveis e fiéis, mas algumas vezes, de repente, o comportamento muda, e eles podem ficar mais quietos e apáticos. ",
        imagem: "https://inovaveterinaria.com.br/wp-content/uploads/2016/01/Gato-siames-INOVA-2048x1365.jpg"
    },
    {
        nome: "Persa e Himalaia",
        descricao: "O gato Persa é, para muitos, sinônimo de gato de luxo, com seu porte tranquilo e pelagem longa. Por isso, é considerado o “rei das exposições”, por ser uma raça de gato peludo e majestosa com focinho plano. Possui temperamento tranquilo e é amável, ótimo para pessoas que possuem outros pets, crianças ou que são tutores pela primeira vez de um felino. Já o Himalaia é uma variação do Persa, com a mesma pelagem longa, porém com coloração diferente, semelhante à do Siamês.",
        imagem: "https://inovaveterinaria.com.br/wp-content/uploads/2016/01/Gato-persa-INOVA-2048x1362.jpg"
    },
    // ... (ADICIONE TODAS AS OUTRAS RAÇAS AQUI)
    {
        nome: "SRD (Sem Raça Definida)",
        descricao: "Os gatos Sem Raça Definida são bem antigos, pois há milhares de anos já cruzavam raças diferentes entre si. Por serem misturas, os gatos SRD podem ter diversas cores e tipos de pelagem, além de tamanhos, formatos e aparências. Não há um temperamento pré-definido, pois estes gatos possuem características de várias raças, mas sabe-se que são gatos saudáveis, carinhosos e amigáveis. Os gatos SRD podem desenvolver problemas renais, causando falta de apetite, vômito, apatia, falta ou excesso de urina, por isso é muito importante que sejam estimulados a beber bastante água.",
        imagem: "https://inovaveterinaria.com.br/wp-content/uploads/2016/01/an-unknown-girl-is-holding-a-mongrel-cat-in-her-arms-2048x1367.jpg"
    }
];


async function main() {
    console.log(`Iniciando o Seeding...`);
    
    // Itera sobre a lista de raças
    for (const racaData of racas) {
        // Tenta criar o registro no banco de dados.
        // O comando 'upsert' tenta encontrar pelo 'nome' e, se não encontrar, cria o registro.
        const raca = await prisma.raca.upsert({
            where: { nome: racaData.nome }, // Critério de busca (para evitar duplicidade)
            update: {},                    // O que atualizar se encontrar (neste caso, nada)
            create: racaData,              // Os dados para criar se não encontrar
        });
        console.log(`Criado ou atualizado raca com ID: ${raca.id} (${raca.nome})`);
    }
    
    console.log(`Seeding finalizado.`);
}

// Executa a função principal e desconecta o Prisma
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });