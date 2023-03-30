import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  kareler: any = []; //tipi belli olmayan boş bir dizi oluşturuyoruz.
  sonraki = true; //sonraki hamlenin ne olacağını kullanıcıya bilgilendirmek için değişken oluşturduk.
  kazanan = ''; //ilk başka kazananımız olmadığı için boş bir değişken oluşturduk
  sayac = 0; //hamle sayısını tutabilmek için değişken oluşturduk.
  ciz = ''; //çizilecek olan karakterin (X yada O) tutulması için değişken oluşturduk.
  sayfayiYenile = true; //oyun bittikten sonra sayfanın yenilenmesi için değişken oluşturduk.
  constructor(){}
  ngOnInit(): void {}
  yeniOyun(){
    this.kareler = Array(9).fill(null); //içi boş olacak şekilde doldurulmuş 9 adet karenin olabilmesini sağlıyoruz.
    this.kazanan = ''; //yeni oyun başladığında kazananımız yok.
    this.ciz = ''; //yeni oyun başladığında çizilecek olan karakterimiz yok
    this.sayac = 0; //yeni oyun başladığı için sayacımız 0
    this.sayfayiYenile = false;// oyun başladığı için yani sayfa yenilenmediği için değişkeni false yapıyoruz
  }
  cizimYap(idx:number){ 
    if(!this.kareler[idx]){
      this.kareler.splice(idx, 1,this.oyuncu);
      this.sonraki = !this.sonraki
      this.sayac++;
    }
    this.kazanan = this.hesaplaKazani(); //puan alınmış ise yani 43. satırdaki if bloğuna girilmişse kazanan olarak ata.
    if(!this.kazanan && this.sayac== 9){ //kazanan yoksa ve hamle sayısı (9) bitmiş ise tahtayı yenile.
      this.ciz = 'sifirla'; 
    }
  }
  hesaplaKazani(){
    const puanlar = [ //puan alınabilecek indislerdeki karelerin numaralarını dizi içinde dizi olarak belirliyoruz.
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]
    for(let i=0; i<puanlar.length; i++){
      const [a,b,c] = puanlar[i]; //puanlar dizisinde yer alan indisteki değerleri sırasıyla a,b,c değerlerine atıyoruz. 
      if (this.kareler[a] && this.kareler[a] === this.kareler[b] && this.kareler[a] === this.kareler[c]){ // a'daki değer ile b ve c'deki değerler aynı ise (X'te olabilir O'da olabilir) bunu geri döndür.
        return this.kareler[a];
      }
    }
    return null; // if'e girmiyorsa yanlış demektir boş döndür.
  }
  get oyuncu(){
    return this.sonraki?'X':'O'; //sonraki oyuncunun X mi O mu olacağını tanıtıyoruz. if sorgumuz true olursa X false olursa O dönecek.
  }
}
