const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
	webVersionCache: {
	  type: "remote",
	  remotePath:
		"https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
	},
  });

client.on('ready', () => {
    console.log('Client is ready!');
});

let qrCodeGenerated = false; 

client.on('qr', qr => {
    if (!qrCodeGenerated) { 
        qrcode.generate(qr, {small: true});
        qrCodeGenerated = true;  
    }
});

client.on('message_create', message => {
    const mensagemRecebida = message.body.toLowerCase();
    const palavrasChave = ['oi, tudo bem?', 'ola', 'oi'];

    if (palavrasChave.includes(mensagemRecebida)) {
        const resposta =
            `Seja bem-vindo à Pizzaria X!\n\n` +
            `Para realizar seu pedido, por favor, me envie as seguintes informações:\n` +
            `Nome:\n` +
            `Endereço:\n` +
            `Sabor e tamanho da pizza:\n` +
            `Forma de pagamento:\n\n` +
            `Caso tenha alguma dúvida, basta digitar os seguintes comandos:\n` +
            `!sabores: Lista dos sabores disponíveis e seus tamanhos com o preço.\n` +
            `!pagamento: Métodos de pagamento disponíveis.\n` +
            `!cancelar: Para cancelar seu pedido.`;

        client.sendMessage(message.from, resposta);
    }
});

client.on('message_create', message => {
    const mensagemRecebida = message.body.toLowerCase();

    if (mensagemRecebida === '!sabores') {
        const listaSabores =
            `Lista de sabores disponíveis:\n\n` +
            `1. Calabresa:\n   - Tamanho Médio: R$20,00\n   - Tamanho Grande: R$25,00\n   - Tamanho Gigante: R$30,00\n   - Descrição: Mussarela, calabresa, cebola.\n\n` +
            `2. Mussarela:\n   - Tamanho Médio: R$18,00\n   - Tamanho Grande: R$23,00\n   - Tamanho Gigante: R$28,00\n   - Descrição: Mussarela e molho de tomate.\n\n` +
            `3. Portuguesa:\n   - Tamanho Médio: R$22,00\n   - Tamanho Grande: R$28,00\n   - Tamanho Gigante: R$33,00\n   - Descrição: Mussarela, presunto, ovos, cebola, tomate e azeitonas.\n\n` +
            `4. Frango com Catupiry:\n   - Tamanho Médio: R$24,00\n   - Tamanho Grande: R$30,00\n   - Tamanho Gigante: R$35,00\n   - Descrição: Frango desfiado, catupiry, milho e ervilha.\n\n` +
            `5. Bacon com Cheddar:\n   - Tamanho Médio: R$23,00\n   - Tamanho Grande: R$29,00\n   - Tamanho Gigante: R$34,00\n   - Descrição: Bacon, cheddar, mussarela e molho barbecue.\n\n` +
            `6. Vegetariana:\n   - Tamanho Médio: R$21,00\n   - Tamanho Grande: R$26,00\n   - Tamanho Gigante: R$31,00\n   - Descrição: Palmito, milho, ervilha, champignon, cebola e pimentão.\n\n` +
            `7. Marguerita:\n   - Tamanho Médio: R$19,00\n   - Tamanho Grande: R$24,00\n   - Tamanho Gigante: R$29,00\n   - Descrição: Mussarela, tomate, manjericão.\n`;

        client.sendMessage(message.from, listaSabores);
    }
});

client.on('message_create', message => {
    const mensagemRecebida = message.body.toLowerCase();

    if (mensagemRecebida === '!pagamento') {
        const metodosPagamento =
            `Métodos de pagamento disponíveis:\n\n` +
            `1. Dinheiro\n` +
            `2. Cartão de crédito\n` +
            `3. Cartão de débito\n` +
            `4. Pix\n`;

        client.sendMessage(message.from, metodosPagamento);
    }
});

client.on('message_create', message => {
    const mensagemRecebida = message.body.toLowerCase();

    if (mensagemRecebida === '!cancelar') {
        const resposta = 
            `Seu pedido foi cancelado com sucesso. Caso queira fazer um novo pedido, sinta-se à vontade para nos contatar novamente.`;

        client.sendMessage(message.from, resposta);
    }
});


client.initialize();
