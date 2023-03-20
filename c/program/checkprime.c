int checkprime (int x) {
  for (int i = 2; i < x; i++) {
    if (x == 2){
      return 0;
    }
    else if (x % i == 0){
      return 1;
    }
  }
  return 0;
}
