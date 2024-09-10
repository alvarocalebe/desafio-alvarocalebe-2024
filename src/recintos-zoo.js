class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        console.log(`\nAnalisando recinto para o animal: ${animal} com quantidade: ${quantidade}\n`);

        const especiesValidas = ['leao', 'leopardo', 'crocodilo', 'macaco', 'gazela', 'hipopotamo'];

        if (!especiesValidas.includes(animal.toLowerCase())) {
            console.log(`Erro: Animal inválido`);
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        console.log(`Animal é válido: ${animal}`);

        if (quantidade <= 0 || (quantidade % 1 !== 0)) {
            console.log(`Erro: Quantidade inválida`);
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
        console.log(`Quantidade é válida: ${quantidade}`);

        const recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['gazela'] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['leao'] }
        ];

        const tamanhosAnimais = {
            leao: 3,
            leopardo: 2,
            crocodilo: 3,
            macaco: 1,
            gazela: 2,
            hipopotamo: 4
        };

        const biomasAnimais = {
            leao: ['savana'],
            leopardo: ['savana'],
            crocodilo: ['rio'],
            macaco: ['savana', 'floresta'],
            gazela: ['savana'],
            hipopotamo: ['savana', 'rio']
        };

        const carnivoros = ['leao', 'leopardo', 'crocodilo'];
        let recintosViaveis = [];

        animal = animal.toLowerCase();

        for (let recinto of recintos) {
            console.log(`\n--- Analisando o recinto número: ${recinto.numero} ---`);

            if (!biomasAnimais[animal]) {
                console.log(`Erro: Animal ${animal} não tem biomas definidos`);
                continue;
            }

            const biomaCompativel = biomasAnimais[animal].some(bioma => recinto.bioma.includes(bioma));
            console.log(`Bioma compatível: ${biomaCompativel}`);

            const espacoOcupado = recinto.animaisExistentes.reduce((total, a) => total + tamanhosAnimais[a], 0);
            console.log(`Espaço ocupado no recinto: ${espacoOcupado}`);

            if (!biomaCompativel) {
                console.log(`Recinto número ${recinto.numero} não é compatível com o bioma do animal`);
                continue;
            }

            const espacoNecessario = quantidade * tamanhosAnimais[animal];
            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
            let espacoExtra = 0;

            const especiesExistentes = [...new Set(recinto.animaisExistentes)];
            if (especiesExistentes.length > 0 && !especiesExistentes.includes(animal)) {

                espacoExtra = 1;
            }
            console.log(`Espaço necessário: ${espacoNecessario}, Espaço disponível: ${espacoDisponivel}, Espaço extra: ${espacoExtra}`);

            if (espacoNecessario + espacoExtra > espacoDisponivel) {
                console.log(`Não há espaço suficiente para o animal no recinto número ${recinto.numero}`);
                console.log('------------------------------------------------------\n');
                continue;
            }

            const jaTemCarnivoro = recinto.animaisExistentes.some(a => carnivoros.includes(a));
            if (carnivoros.includes(animal) && jaTemCarnivoro && !especiesExistentes.includes(animal)) {
                console.log(`Carnívoros só podem habitar com a própria espécie no recinto número ${recinto.numero}`);
                console.log('------------------------------------------------------\n');
                continue;
            }
            if (!carnivoros.includes(animal) && jaTemCarnivoro) {
                console.log(`Recinto número ${recinto.numero} já tem um animal carnívoro e não pode receber um animal não carnívoro`);
                console.log('------------------------------------------------------\n');
                continue;
            }

            if (carnivoros.includes(animal) && especiesExistentes.length > 0 && !especiesExistentes.includes(animal)) {
                console.log(`Animal carnívoro ${animal} não pode habitar com outras espécies no recinto número ${recinto.numero}`);
                console.log('------------------------------------------------------\n');
                continue;
            }

            if (animal === 'hipopotamo' && especiesExistentes.length > 0) {
                const biomaContemSavanaERio = recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
                if (!biomaContemSavanaERio) {
                    console.log(`Hipopotamos só podem habitar com outras espécies em recintos com ambos savana e rio`);
                    console.log('------------------------------------------------------\n');
                    continue;
                }
            }

            if (animal === 'macaco' && quantidade === 1 && especiesExistentes.length === 0) {
                console.log(`Macacos não se sentem confortáveis sozinhos e o recinto número ${recinto.numero} não é adequado`);
                console.log('------------------------------------------------------\n');
                continue;
            }

            if (espacoDisponivel < espacoNecessario) {
                console.log(`Espaço insuficiente para o lote completo de animais no recinto número ${recinto.numero}`);
                console.log('------------------------------------------------------\n');
                continue;
            }

            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoNecessario - espacoOcupado - espacoExtra} total: ${recinto.tamanhoTotal})`);
            console.log(`Recinto número ${recinto.numero} é adequado`);
            console.log('------------------------------------------------------\n');
        }

        if (recintosViaveis.length === 0) {
            console.log(`Não há recinto viável`);
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        console.log(`\nRecintos viáveis encontrados: ${recintosViaveis}\n`);
        return { erro: null, recintosViaveis };
    }
}

// Exemplo de uso
const zoo = new RecintosZoo();
zoo.analisaRecintos('crocodilo', 1);

export { RecintosZoo as RecintosZoo };
