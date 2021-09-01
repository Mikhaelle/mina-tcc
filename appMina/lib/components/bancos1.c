#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main(){
    int input;
    int pessoa;
    int carro;

    printf("Selecione um numero: %d", input);

    if(input==0){
        return 0;
    }

    switch (input)
    {
    case 1:
        printf("Cadastrar novo usuário:");
    case 2:
        printf("Cadastrar carro do usuário");
    default:
        break;
    }
}