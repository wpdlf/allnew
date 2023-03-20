<<<<<<< HEAD
#include <stdio.h>
#include "libcheckprime.h"

void main() {
  while (1) {
    int n;
    printf("Input Number : ");
    scanf("%d", &n);

    if (n == 0){
      break;
    }
    else if (checkprime(n) == 0){
      printf("%d is prime number \n", n);
    }
    else if (checkprime(n) == 1){
      printf("%d is not prime number \n", n);
    }
  }
}
=======
#include <stdio.h>
#include "libcheckprime.h"

void main() {
  while (1) {
    int n;
    printf("Input Number : ");
    scanf("%d", &n);

    if (n == 0){
      break;
    }
    else if (checkprime(n) == 0){
      printf("%d is prime number \n", n);
    }
    else if (checkprime(n) == 1){
      printf("%d is not prime number \n", n);
    }
  }
}
>>>>>>> 74b5ff415b1ad3cb2579422e40d80d52580ecf21
