//buat jumlah pesanan
function tambah() {
  document.getElementById('jumlah').stepUp()
}

function kurang() {
  document.getElementById('jumlah').stepDown()
}

//ngambil element
const nama = document.querySelector('#namaMakanan');
const harga = document.querySelector('#harga')
const jumlah = document.querySelector('#jumlah')
const btnTambah = document.querySelector('#tambah')
const btnPesan = document.querySelector('#pesan')
const listPesanan = document.querySelector('#listPesanan')
const totpembelian = document.querySelector('#totalPembelian')

//set harga pas dropdown dipilih
function ubahHarga() {
  const namak = nama.options[nama.selectedIndex].text
  switch (namak) {
    case "Indomie":
      harga.value = 5000
      break;
    case "Pancong":
      harga.value = 7000
      break;
    case "Tahu Goreng":
      harga.value = 2000
      break;
    case "Nasi Uduk":
      harga.value = 10000
      break;

    default:
      break;
  }
}

//tombol tambah diklik
btnTambah.addEventListener('click', function () {
  const namak = nama.options[nama.selectedIndex].text
  if (namak == "" || jumlah.value == 0) {
    alert("Masukkan dengan lengkap")
  } else {
    const pesanan = {
      nama: namak,
      harga: harga.value,
      jumlah: jumlah.value
    }
    setLS(pesanan)
    getPesanan()
  }
})

//masukin pesanan ke local storage
function setLS(data) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart = [];
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

//nampilin pesanan
function getPesanan() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let htmlPesanan = ""
  let totpemb = 0
  cart.forEach((pesanan) => {
    htmlPesanan += `
    <tr>
      <td>${pesanan.nama}</td>
      <td>${pesanan.harga}</td>
      <td>${pesanan.jumlah}</td>
      <td>${pesanan.harga * pesanan.jumlah}</td>
    </tr>
    `
    totpemb += parseInt(pesanan.harga) * parseInt(pesanan.jumlah)
  })
  listPesanan.innerHTML = htmlPesanan
  totpembelian.textContent = totpemb
}


//tombol pesan diklik
btnPesan.addEventListener('click', function () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let teksPesanan = ""
  cart.forEach((pesanan) => {
    teksPesanan += `${pesanan.jumlah} ${pesanan.nama}
`
  })
  if (!liff.isInClient()) {
    window.alert(`Pesanan anda:

${teksPesanan}
Silahkan tunjukkan pesanan ini ke abang anip`)
  } else {
    liff.sendMessages([{
      'type': 'text',
      'text': `Hai ${namaPengguna},

Terima kasih telah memesan, berikut daftar pesanan anda:

${teksPesanan}
Pesanan anda akan segera diproses dan akan diberi tahu jika sudah bisa diambil.
Mohon ditunggu, terima kasih.`
    }]).then(function () {
      window.alert('Silahkan lihat pesanan anda di chat.')
    }).catch(function (error) {
      window.alert('yah gabisa' + error)
    })
    localStorage.clear()
    location.reload()
  }
})