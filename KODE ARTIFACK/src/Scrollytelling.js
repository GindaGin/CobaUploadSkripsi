import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet" />


//imageSlides yang digunakan untuk menyimpan kelompok gambar (slide) berdasarkan urutan langkah.
const imageSlides = {
  1: [
    { src: 'tentangsungai.png', alt: 'Sungai Batanghari 1', source: 'Sungai Batanghari di Kota Jambi (www.tempo.co)' },
    { src: 'tentangsungai2.png', alt: 'Sungai Batanghari 2', source: 'Sungai Batanghari (cnbcindonesia.com)' },
  ],

  2: [
    { src: 'masalah1.png', alt: 'masalah1', source: 'Kondisi Anak Sungai Batangasai akibat pertambangan emas ilegal di hulu sungai (www.ekuatorial.com)' },
    { src: 'masalah2.png', alt: 'masalah2', source: 'Hulu Sungai Penetai dalam Taman Nasional Kerinci Seblat rusak berat akibat aktivitas tambang emas ilegal awal Febuari 2023 (www.kompas.com)' },
    { src: 'masalah3.png', alt: 'masalah3', source: 'Kerusakan Lanskap Bukit Bulan akibat aktivitas pertambangan emas ilegal di Desa Lubuk Bedorong, Limun, Sarolangun, Jambi, Kamis 18 November 2021 (wwww.tempo.co)' },
  ],

  3: [
    { src: 'sumatra.png', alt: 'sumatra', source: 'Pulau Sumatra' },
    { src: 'kabupaten.png', alt: 'kabupaten', source: 'Kabupaten Tebo' },
    { src: 'kecamatan.png', alt: 'kecamatan', source: 'Kecamatan Tebo Tengah' },
    { src: 'lokasi.png', alt: 'lokasi', source: 'Lokasi penelitian' },
  ],

};

// array yang berisi objek-objek yang menyimpan informasi tentang titik-titik pengamatan kualitas air di Sungai Batanghari berdasarkan hasil ground truth.
const groundTruthSlides = [
  {
    image: 'sangatbaik1.png',
    caption: 'Kategori Sangat Baik Titik 1',
    caption2: <>Titik ini terletak di aliran utama Sungai Batanghari, dengan posisi geografis yang dikelilingi oleh tutupan vegetasi lebat dan minim aktivitas antropogenik di sekitarnya. Berdasarkan hasil interpretasi citra dari <i>Google Earth Engine</i>, air pada lokasi ini tampak bersih secara visual, dengan warna coklat muda yang cenderung merata. Hal ini menunjukkan tingkat kekeruhan yang relatif rendah dibandingkan dengan lokasi lain. Tidak terlihat adanya aktivitas tambang di sekitar area ini. Kategori “Sangat Baik” pada titik ini mencerminkan variabel-variabel kualitas air berada dekat dengan nilai idealnya, baik dari sisi pH, <i>Total Suspended Solids</i> (TSS), <i>Total Dissolved Solids</i> (TDS), <i>Electrical Conductivity</i> (EC), maupun <i>Chlorophyll-a</i> (CHLA). Temuan ini memperlihatkan bahwa segmen tertentu dari Sungai Batanghari masih memiliki kondisi ekologis yang relatif terjaga berdasarkan 5 variabel yang digunakan, terutama pada bagian-bagian yang berada jauh dari gangguan antropogenik.</>
  },
  {
    image: 'sangatbaik2.png',
    caption: 'Kategori Sangat Baik Titik 2',
    caption2: <>Titik ini terletak di aliran utama Sungai Batanghari, dengan posisi geografis yang dikelilingi oleh tutupan vegetasi lebat. Namun, terdapat aktivitas antropogenik di sekitarnya. Berdasarkan hasil interpretasi citra dari <i>Google Earth Engine</i>, air pada lokasi ini tampak bersih secara visual, dengan warna coklat muda yang cenderung merata. Hal ini menunjukkan tingkat kekeruhan yang relatif rendah dibandingkan dengan lokasi lain. Terdapat aktivitas tambang, namun tidak terlalu dekat dengan titik “Sangat Baik”. Kategori “Sangat Baik” pada titik ini mencerminkan variabel-variabel kualitas air berada dekat dengan nilai idealnya, baik dari sisi pH, TSS, TDS, EC, maupun klorofil-a. Temuan ini memperlihatkan bahwa segmen tertentu dari Sungai Batanghari masih memiliki kondisi ekologis yang relatif terjaga berdasarkan 5 variabel yang digunakan, terutama pada bagian-bagian yang berada jauh dari gangguan antropogenik.</>
  },
  {
    image: 'sangatbaik3.png',
    caption: 'Kategori Sangat Baik Titik 3',
    caption2: <>Titik ini terletak di aliran utama Sungai Batanghari. Namun, terdapat aktivitas antropogenik di sekitarnya. Berdasarkan hasil interpretasi citra dari <i>Google Earth Engine</i>, air pada lokasi ini tampak bersih secara visual, dengan warna coklat muda yang cenderung merata. Hal ini menunjukkan tingkat kekeruhan yang relatif rendah dibandingkan dengan lokasi lain. Terdapat aktivitas tambang, namun tidak terlalu dekat dengan titik “Sangat Baik”. Kategori “Sangat Baik” pada titik ini mencerminkan variabel-variabel kualitas air berada dekat dengan nilai idealnya, baik dari sisi pH, TSS, TDS, EC, maupun klorofil-a. Temuan ini memperlihatkan bahwa segmen tertentu dari Sungai Batanghari masih memiliki kondisi ekologis yang relatif terjaga berdasarkan 5 variabel yang digunakan, terutama pada bagian-bagian yang berada jauh dari gangguan antropogenik.</>
  },
  {
    image: 'baik1.png',
    caption: 'Kategori Baik Titik 1',
    caption2: <>Berdasarkan hasil ground truth dari <i>Google Earth Engine</i> (GEE), warna air pada titik ini relatif seragam dan tidak terlalu pekat. Meski tidak sebersih kategori “Sangat Baik”, air di area ini memiliki tingkat kekeruhan yang sedang. Lokasi ini tidak berada tepat di sekitar lubang tambang aktif, namun terdapat indikasi adanya bekas tambang atau genangan kecil di sisi barat daya. Kategori “Baik” menunjukkan bahwa nilai indeks WAWQI pada titik ini berada dalam rentang yang masih sesuai untuk kelas 2.</>
  },
  {
    image: 'baik2.png',
    caption: 'Kategori Baik Titik 2',
    caption2: <>Berdasarkan hasil ground truth dari <i>Google Earth Engine</i> (GEE), warna air pada titik ini relatif seragam dan tidak terlalu pekat. Meski tidak sebersih kategori “Sangat Baik”, air di area ini memiliki tingkat kekeruhan yang sedang. Lokasi ini tidak berada tepat di sekitar lubang tambang aktif, namun terdapat indikasi adanya bekas tambang atau genangan kecil di sisi barat daya.</>
  },
  {
    image: 'baik3.png',
    caption: 'Kategori Baik Titik 3',
    caption2: <>Berdasarkan hasil ground truth dari <i>Google Earth Engine</i> (GEE), warna air pada titik ini relatif seragam dan tidak terlalu pekat. Meski tidak sebersih kategori “Sangat Baik”, air di area ini memiliki tingkat kekeruhan yang sedang. Lokasi ini tidak berada tepat di sekitar lubang tambang aktif, namun terdapat indikasi adanya bekas tambang. Kategori “Baik” menunjukkan bahwa nilai indeks WAWQI pada titik ini berada dalam rentang yang masih sesuai untuk kelas 2.</>
  },
  {
    image: 'buruk1.png',
    caption: 'Kategori Buruk Titik 1',
    caption2: 'Secara visual, warna air di lokasi ini terlihat lebih keruh dibandingkan dengan kategori “Baik” maupun “Sangat Baik”, dengan warna coklat yang menyebar merata. Warna ini merupakan indikator umum dari tingginya kadar TSS. Terlihat juga adanya bekas galian atau lahan terbuka di bagian utara, yang berpotensi menjadi sumber pencemar. Titik ini menunjukkan bahwa meskipun berada di aliran utama sungai, kondisi kualitas air dapat menurun apabila berada dekat dengan area yang terdampak aktivitas pertambangan emas ilegal. '
  },
    {
    image: 'buruk2.png',
    caption: 'Kategori Buruk Titik 2',
    caption2: 'Secara visual, warna air di lokasi ini terlihat lebih keruh dibandingkan dengan kategori “Baik” maupun “Sangat Baik”, dengan warna coklat yang menyebar merata. Warna ini merupakan indikator umum dari tingginya kadar TSS. Selain itu, titik ini berbatasan langsung dengan daratan yang menunjukkan bekas galian pertambangan emas ilegal. Keberadaan titik ini menunjukkan  bahwa aktivitas tambang yang bersinggungan langsung dengan badan sungai sangat berpotensi menurunkan kualitas air.'
  },
  {
    image: 'buruk3.png',
    caption: 'Kategori Buruk Titik 3',
    caption2: 'Secara visual, warna air di lokasi ini terlihat lebih keruh dibandingkan dengan kategori “Baik” maupun “Sangat Baik”, dengan warna coklat yang menyebar merata. Warna ini merupakan indikator umum dari tingginya kadar TSS. Selain itu, terdapat keberadaan bekas galian tambang di sisi barat laut serta vegetasi yang relatif padat di utara.  Keberadaan titik ini menunjukkan bahwa aktivitas tambang yang berbatasan langsung dengan badan sungai sangat berpotensi menurunkan kualitas air.'
  },
  {
    image: 'sangatburuk1.png',
    caption: 'Kategori Sangat Buruk Titik 1',
    caption2: 'Secara visual, citra satelit menunjukkan bahwa seluruh area di sekitar titik ini merupakan bekas galian tambang, dengan pola lubang-lubang air yang tersebar merata dan air yang tampak keruh pekat berwarna coklat. Warna ini mengindikasikan tingginya kandungan TSS yang umum ditemukan di air tergenang tanpa aliran dan dengan beban pencemaran tinggi. Temuan ini menunjukkan bahwa area-area genangan hasil tambang sangat rentan mengalami penurunan kualitas air ekstrem, yang bukan hanya berdampak pada ekosistem lokal, tapi juga berpotensi menyebarkan pencemaran ke badan sungai utama saat musim hujan atau terjadi perembesan.'
  },
    {
    image: 'sangatburuk2.png',
    caption: 'Kategori Sangat Buruk Titik 2',
    caption2: 'Secara visual, citra satelit menunjukkan bahwa seluruh area di sekitar titik ini merupakan bekas galian tambang, dengan pola lubang-lubang air yang tersebar merata dan air yang tampak keruh pekat berwarna coklat. Warna ini mengindikasikan tingginya kandungan TSS yang umum ditemukan di air tergenang tanpa aliran dan dengan beban pencemaran tinggi. Kategori “Sangat Buruk” dalam indeks WAWQI menunjukkan dampak akumulatif dari aktivitas tambang terhadap kualitas air. Temuan ini menunjukkan bahwa area-area genangan hasil tambang sangat rentan mengalami penurunan kualitas air ekstrem, yang bukan hanya berdampak pada ekosistem lokal, tapi juga berpotensi menyebarkan pencemaran ke badan sungai utama saat musim hujan atau terjadi perembesan.'
  },
  {
    image: 'sangatburuk3.png',
    caption: 'Kategori Sangat Buruk Titik 3',
    caption2: 'Secara visual, citra satelit menunjukkan bahwa seluruh area di sekitar titik ini merupakan bekas galian tambang, dengan pola lubang-lubang air yang tersebar merata dan air yang tampak keruh pekat berwarna coklat. Warna ini mengindikasikan tingginya kandungan TSS yang umum ditemukan di air tergenang tanpa aliran dan dengan beban pencemaran tinggi. Kategori “Sangat Buruk” dalam indeks WAWQI menunjukkan dampak akumulatif dari aktivitas tambang terhadap kualitas air. Temuan ini menunjukkan bahwa area-area genangan hasil tambang sangat rentan mengalami penurunan kualitas air ekstrem, yang bukan hanya berdampak pada ekosistem lokal, tapi juga berpotensi menyebarkan pencemaran ke badan sungai utama saat musim hujan atau terjadi perembesan.'
  },
  {
    image: 'tidaklayak1.png',
    caption: 'Kategori Tidak layak Titik 1',
    caption2: <>Area ini terletak di luar aliran utama sungai. Namun, masih berada dalam zona yang sangat dipengaruhi oleh aktivitas pertambangan emas ilegal. Hasil <i>ground truth</i> yang dilakukan melalui <i>Google Earth Engine</i> (GEE) menunjukkan bahwa titik tersebut berada di area bekas tambang emas ilegal, dengan kondisi lingkungan yang didominasi oleh lubang-lubang galian yang tergenang. Air di lokasi ini terlihat sangat keruh dan berwarna coklat pekat, yang secara visual mengindikasikan tingginya kandungan TSS. Temuan ini menunjukkan bahwa aktivitas pertambangan ilegal di sekitar sungai dapat menimbulkan degradasi kualitas air secara signifikan di wilayah sekitarnya.</>
  },
    {
    image: 'tidaklayak2.png',
    caption: 'Kategori Tidak layak Titik 2',
    caption2: <>Area ini terletak di luar aliran utama sungai, namun masih berada dalam zona yang sangat dipengaruhi oleh aktivitas pertambangan emas ilegal. Hasil <i>ground truth</i> yang dilakukan melalui <i>Google Earth Engine</i> (GEE) menunjukkan bahwa titik tersebut berada di area bekas tambang emas ilegal, dengan kondisi lingkungan yang didominasi oleh lubang-lubang galian yang tergenang. Air di lokasi ini terlihat sangat keruh dan berwarna coklat pekat seperti pada titik pertama Gambar 30, yang secara visual mengindikasikan tingginya kandungan TSS. Temuan ini menunjukkan bahwa aktivitas pertambangan ilegal di sekitar sungai dapat menimbulkan degradasi kualitas air secara signifikan di wilayah sekitarnya.</>
  },
  {
    image: 'tidaklayak3.png',
    caption: 'Kategori Tidak layak Titik 3',
    caption2: <>Area ini terletak di luar aliran utama sungai, namun masih berada dalam zona yang sangat dipengaruhi oleh aktivitas pertambangan emas ilegal. Hasil <i>ground truth</i> yang dilakukan melalui <i>Google Earth Engine</i> (GEE) menunjukkan bahwa titik tersebut berada di area bekas tambang emas ilegal, dengan kondisi lingkungan yang didominasi oleh lubang-lubang galian yang tergenang. Air di lokasi ini terlihat keruh dan berwarna coklat, Namun tidak sepekat pada titik pertama Gambar 30, yang secara visual mengindikasikan tingginya kandungan TSS. Titik ketiga ini berada sangat dekat dengan area perkebunan kelapa sawit. Temuan ini menunjukkan bahwa aktivitas pertambangan ilegal di sekitar sungai dapat menimbulkan degradasi kualitas air secara signifikan di wilayah sekitarnya.</>
  },
];


// Mengatur konten naratif secara bertahap
const steps = [
  {
    title: 'Selamat Datang',
    description:
      'Web ini memperkenalkan kamu pada kualitas air di Sungai Batanghari dan dampak pertambangan emas ilegal. Kita akan jelajahi ini secara bertahap bersama Penjaga Sungai.',
    speech:
      'Halo, selamat datang di web edukasi interaktif kualitas air Sungai Batanghari! Yuk, jelajahi bersama saya.',
  },
  {
    title: 'Tentang Sungai Batanghari',
    description:
      'Sungai Batanghari merupakan sungai terpanjang di Pulau Sumatra. Sungai ini memiliki panjang 870 kilometer, dengan lebar 300-500 meter dan kedalaman sungai 6-7 meter (Dinas Lingkungan Hidup Provinsi Jambi Tahun, 2022).',
    speech:
      'Ini adalah Sungai Batanghari, sungai terpanjang di Pulau Sumatra yang memiliki peranan penting bagi banyak makhluk hidup.',
  },
  {
    title: 'Permasalahan',
     description:  `Hingga saat ini Sungai Batanghari mengalami berbagai masalah, mulai dari kerusakan bantaran akibat permukiman, lahan yang kritis, sampah yang menumpuk, air sungai tercemar akibat penebangan dan penambangan ilegal yang mengakibatkan rusaknya ekosistem Sungai Batanghari (PPID Provinsi Jambi Tahun 2022). Hal ini terlihat dari semakin menurunnya angka Indeks Kualitas Air (IKA) Provinsi Jambi pada tahun 2023 yaitu berada di angka 46,06 dan merupakan IKA terendah nomor 3 di Indonesia setelah Provinsi DI Yogyakarta dan DKI Jakarta (Direktorat PPA KLHK, 2023). Pertambangan Tanpa Izin (PETI) adalah kegiatan memproduksi mineral atau batubara yang dilakukan oleh masyarakat atau perusahaan tanpa memiliki izin, tidak menggunakan prinsip pertambangan yang baik, serta memiliki dampak negatif bagi lingkungan hidup, ekonomi, dan sosial (Kementerian ESDM, 2022).

Artisanal and Small-Scale Gold Mining (ASGM) / Pertambangan Emas Skala Kecil (PESK), adalah sektor pertambangan emas skala kecil dan tradisional yang melibatkan individu atau kelompok kecil dengan peralatan sederhana untuk menambang emas. PESK berkontribusi hingga 20% dari total produksi emas dunia tetapi juga menjadi sumber utama pelepasan merkuri ke lingkungan, mencemari udara, air, dan tanah (UN Environment Programme, 2018). Ada dua jenis PESK di Indonesia yaitu PESK yang memiliki izin dan PESK yang tidak memiliki izin. Sebagian besar aktivitas PESK di Indonesia masih beroperasi secara ilegal, karena mereka tidak memiliki izin dari pemerintah. PESK ilegal dianggap merugikan negara karena tidak berlisensi, tidak membayar royalti, tidak dapat diatur, serta berkontribusi terhadap kerusakan lingkungan dan dampak kesehatan yang merugikan akibat penggunaan merkuri (Meutia et al., 2022).  
Di Provinsi Jambi banyak terjadi kasus Penambangan Emas Tanpa Izin, bahkan Komisi IV DPR RI juga meminta Kementerian Lingkungan Hidup dan Kehutanan (KLHK) untuk melakukan riset pada hulu Sungai di Jambi dikarenakan terdapat aktivitas Penambangan Emas Tanpa Izin yang membuang cairan sianida dan mercuri ke aliran Sungai (Media DPR RI, 2024). Menurut Organisasi Kesehatan Dunia (WHO) dan organisasi internasional lainnya, kualitas air dapat dirangkum sebagai kondisi air yang mencakup karakteristik fisik, kimia, dan biologisnya, baik dalam keadaan alami maupun setelah mengalami perubahan akibat tindakan manusia. `,

    speech:
      'Pertambangan emas ilegal menyebabkan pencemaran dan kerusakan ekosistem sungai yang berbahaya bagi manusia dan alam.',
  },
  {
    title: 'Lokasi Penelitian',
    description:
      'Penelitian ini dilakukan di wilayah Kecamatan Tebo Tengah, Kabupaten Tebo, Provinsi Jambi  Tahun 2024. Unit analisis yang digunakan adalah berupa piksel data raster dengan ukuran 20 meter. Penyusunan indeks kualitas air menggunakan 5 variabel. Semua variabel tersebut merupakan data citra satelit (spasial). Peta wilayah Kecamatan Tebo Tengah, Kabupaten Tebo, Provinsi Jambi (-1.5227549, 102.4839212).',
    speech:
      'Penelitian ini dilakukan di daerah pertambangan emas ilegal. Data lokasi pertambangan emas ilegal diperoleh melalui Polda Jambi.',
  },
  {
  title: '',
  description: [
  {
    groupTitle: 'Metode Klasterisasi',
    layout: 'horizontal',
    items: [
      {
        title: 'KMeans',
        text: 'K-Means merupakan metode klasterisasi populer yang bekerja dengan mengelompokkan data berdasarkan jarak ke pusat klaster. Algoritma ini bekerja dengan cara memberikan sebuah klaster awal yang mungkin belum optimal, lalu memindahkan setiap titik data ke pusat klaster terdekatnya yang baru. Setelah itu, pusat klaster diperbarui dengan menghitung rata-rata dari anggota titik data dalam klaster tersebut. Proses ini diulangi hingga memenuhi kriteria konvergensi, seperti jumlah iterasi yang telah ditentukan sebelumnya atau perbedaan dalam nilai fungsi distorsi (Sammut & Webb, 2011).'
      },
      {
        title: 'Fuzzy C-Means (FCM)',
        text: 'Fuzzy C-Means (FCM) diperkenalkan oleh Dunn dan dikembangkan lebih lanjut oleh J. C. Bezdek pada tahun 1981 sebagai pengembangan dari metode Hard C-Means (HCM). Fuzzy C-Means (FCM) adalah metode clustering berbasis fuzzy yang bertujuan untuk meminimalkan suatu fungsi objektif (Bezdek, 1981). FCM adalah bagian dari algoritma berbasis fungsi objektif, di mana proses clustering dilakukan dengan menghitung derajat keanggotaan setiap data terhadap setiap klaster .Metode ini mirip dengan C-Means, tetapi menggunakan teknik fuzzy sehingga memungkinkan satu data memiliki keanggotaan dalam lebih dari satu klaster dengan nilai keanggotaan antara 0 dan 1. '
      }
    ]
  },
  
  {
    groupTitle: 'Metode Indeks',
    items: [
      {
        title: <> <i>Weighted Arithmetic Water Quality Index</i> (WAWQI) </>,
        text: (
     <>
      <p>
        <i>Weighted Arithmetic Water Quality Index</i> (WAWQI) mengkategorikan kualitas air berdasarkan tingkat kemurniannya dengan menggunakan berbagai variabel kualitas air yang umum diukur. Setiap variabel diberikan bobot sesuai tingkat kepentingannya terhadap kualitas air, sehingga nilai akhir indeks mencerminkan kondisi air secara menyeluruh (Chidiac et al., 2023).
      </p>
      <p>
        Metode WAWQI yang digunakan dalam penelitian ini terdiri dari 4 langkah utama, yaitu (Patel et al., 2023):
      </p>
      <ol className="list-decimal list-inside space-y-1">
        <li>Memilih variabel yang akan digunakan untuk mengukur kualitas air.</li>
        <li>Menghitung nilai kualitas (rating) untuk setiap variabel yang terpilih.</li>
        <li>
          Menghitung bobot satuan (<i>Wi</i>) untuk setiap variabel, di mana nilai <i>Wi</i> berbanding terbalik dengan nilai standar yang direkomendasikan untuk variabel tersebut (dilambangkan dengan <i>Sn</i>).
        </li>
        <li>
          Menghitung nilai total WQI dengan menjumlahkan nilai subindeks dari masing-masing variabel.
        </li>
      </ol>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="table-wrapper-metode">
          <table className="styled-table-metode">
            <thead>
              <tr>
                <th>Nilai WAWQI</th>
                <th>Status Kualitas Air</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >0 - 25</td>
                <td>Sangat baik</td>
              </tr>
              <tr>
                <td>26 - 50</td>
                <td>Baik</td>
              </tr>
              <tr>
                <td>51 - 75</td>
                <td>Buruk</td>
              </tr>
              <tr>
                <td>76 - 100</td>
                <td>Sangat buruk</td>
              </tr>
              <tr>
                <td>&gt; 100</td>
                <td>Tidak layak</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>

    </>
    )
      }
    ]
  }
]
,
speech:
    <>Metode penelitian yang digunakan yaitu metode klasterisasi yaitu K-Means dan Fuzzy C-Means (FCM), serta metode indeks <i> Weighted Arithmetic Water Quality Index </i> (WAWQI).</>      
  }
,
{
    title: 'Variabel Penelitian',
    description: [
  {
    groupTitle: '',
    layout: 'horizontal',
    items: [
      {
        title: <><i>Chlorophyll–a</i></>,
        text: <><i>Chlorophyll–a</i> merupakan indikator utama dalam menentukan jumlah biomassa alga dalam suatu sampel air. Konsentrasi <i>Chlorophyll–a</i> ditentukan melalui pengukuran absorbansi, yaitu seberapa banyak cahaya yang diserap oleh larutan ekstrak klorofil (Lim dan Choi, 2015). <i>Chlorophyll–a</i> berfungsi sebagai indikator kelimpahan dan kualitas biomassa fitoplankton. Namun, pertumbuhan berlebih dapat mengganggu produktivitas primer dan sekunder ekosistem, yang berdampak negatif pada lingkungan perairan. (Barraza-Moraga et al., 2022).</>
      },

      {
        title: <><i>Electrical Conductivity</i> (EC)</>,
        text: <><i>Soil salinity</i> merupakan salah satu permasalahan lingkungan yang berdampak negatif terhadap pertumbuhan tanaman, produksi tanaman, serta kualitas tanah dan air, yang pada akhirnya menyebabkan erosi tanah dan degradasi lahan (Rahmati & Hamzehpour, 2017). EC digunakan sebagai ukuran tidak langsung untuk menentukan tingkat salinitas dalam ekstrak air tanah atau suspensi tanah. Prinsip pengukurannya didasarkan pada kemampuan larutan tersebut dalam menghantarkan arus listrik di antara dua elektroda di mana semakin tinggi konsentrasi garam, semakin besar arus yang dapat dihantarkan.</>
      },
      {
        title: <><i>Total Dissolved Solids</i> (TDS)</>,
        text: 'TDS adalah ukuran massa zat organik dan anorganik terlarut yang dapat disaring dalam suatu volume air setelah proses penguapan. TDS mencerminkan jumlah partikel terlarut dalam air yang tidak dapat disaring dengan metode sederhana. Tingkat TDS di perairan dipengaruhi oleh faktor alami, aliran air dari kawasan perkotaan, limbah industri dan rumah tangga, serta zat kimia yang digunakan dalam proses pengolahan air (G. Adjovu et al., 2023).'
      },
      {
        title: 'pH',
        text: 'pH memiliki pengaruh kuat terhadap proses nitrifikasi karena tidak hanya memengaruhi laju pertumbuhan bakteri, tetapi juga mengubah keseimbangan asambasa (Le et al., 2019). pH bersifat optik tidak aktif. Oleh karena itu digunakan metode korelasi dengan faktor lain untuk memperkirakan nilai pH dalam badan air (Hossain et al., 2021). '
      },

      {
        title: <><i>Total Suspended Solids</i> (TSS)</>,
        text: <><i>Total Suspended Solids</i> (TSS) merupakan total padatan tersuspensi dalam air. Jumlah TSS biasanya berhubungan secara linear dengan kekeruhan, sehingga nilai TSS dapat dianggap sebagai indikator yang ideal untuk melacak front kekeruhan (Hafeez et al., 2021).</>
      }

    ]
  }
]
,
  speech:
    <>Penelitian ini menggunakan 5 variabel, yaitu <i>Chlorophyll–a</i>, <i>Electrical Conductivity</i> (EC), <i>Total Dissolved Solids</i> (TDS), pH, dan <i>Turbidity</i>.</>,
      
  }
,

  {
    title: '',
    description: [
  {
  groupTitle: 'Metode K-Means',
  items: [
    {
      text: (
        <>
          {/* TABEL */}
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div className="table-scroll-wrapper">
    <table className="styled-table">
      <thead>
        <tr>
          <th className="fixed-column">Metode</th>
          <th className="fixed-column">k</th>
          <th>DBI</th>
          <th><i>Silhouette</i></th>
          <th>CHI</th>
          <th>WSS</th>
          <th><i>Gap Statistics</i></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>PCA</b></td>
          <td>2</td>
          <td>0.56538</td>
          <td>0.59496</td>
          <td>310467.53062</td>
          <td>183655.74426</td>
          <td>1.31065</td>
        </tr>
          <tr><td></td><td>3</td><td>0.64589</td><td>0.50656</td><td>335128.93471</td><td>101062.56178</td><td>1.63620</td></tr>
          <tr><td></td><td>4</td><td>0.69395</td><td>0.45727</td><td>349720.43280</td><td>68580.38466</td><td>1.73661</td></tr>
          <tr><td></td><td>5</td><td>0.73603</td><td>0.42766</td><td>357349.90273</td><td>51854.52979</td><td>1.72963</td></tr>

          <tr><td><b><i>Equal Weight</i></b></td><td>2</td><td>0.61499</td><td>0.56439</td><td>272494.53498</td><td>5813.74016</td><td>1.81540</td></tr>
          <tr><td></td><td>3</td><td>0.74380</td><td>0.46016</td><td>271857.14039</td><td>3472.45439</td><td>2.21377</td></tr>
          <tr><td></td><td>4</td><td>0.82699</td><td>0.39774</td><td>261588.53208</td><td>2557.18305</td><td>2.42266</td></tr>
          <tr><td></td><td>5</td><td>0.89967</td><td>0.35834</td><td>248996.27584</td><td>2077.37626</td><td>2.55604</td></tr>
      </tbody>
    </table>
  </div>
</div>

          {/* PENJELASAN TABEL */}
          <p style={{ marginTop: '19px' }}>
            Tabel di atas mengevaluasi metode K-Means dengan bobot yang sama untuk setiap variabel menggunakan berbagai metrik klasterisasi. 2 klaster  memiliki nilai <i>Silhouette Score</i> tertinggi sebesar 0.56439, menunjukkan bahwa klaster ini memiliki pemisahan yang lebih jelas dibandingkan klaster lainnya. Selain itu, nilai Davies-Bouldin <i>Index</i> (DBI) terendah sebesar 0.61499 pada 2 klaster menandakan hubungan antar-klaster yang lebih baik dibandingkan klaster lainnya. Namun, 5 klaster memiliki <i>Gap Statistics</i> tertinggi sebesar 2.55604 dan WSS terendah sebesar 2077.37626, yang menunjukkan bahwa klasterisasi semakin kompak seiring bertambahnya jumlah klaster. Meskipun demikian, nilai CHI tertinggi ada pada 2 klaster sebesar 272494.53498, yang menunjukkan keseimbangan optimal antara kepadatan dan pemisahan klaster dalam metode ini. Oleh karena itu, 2 klaster merupakan klaster paling optimal. Namun, karena indeks kualitas air WAWQI membagi kategori kualitas air ke dalam 5 kelas, maka dipilih jumlah klaster sebanyak 5 untuk keperluan perbandingan. Ketika dibandingkan antara jumlah klaster 5 pada K-Means dengan PCA dan K-Means dengan bobot sama, metode dengan PCA terbukti lebih baik berdasarkan nilai Davies-Bouldin <i>Index</i> (DBI), <i>Silhouette Score</i>, dan CHI. Gambar di bawah menunjukkan hasil metode K-Means dengan PCA menggunakan 5 klaster.          
          </p>

          {/* GAMBAR 1 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="petakmeans.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 1 */}
          <p>
          </p>

          {/* GAMBAR 2 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="radarkmeans.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 2 */}
          <p>
            <i>Radar chart</i> di atas menjelaskan perbedaan karakteristik kualitas air antara lima klaster yang diidentifikasi. Setiap klaster diwakili oleh satu garis berwarna yang membentuk poligon tertutup, memperlihatkan karakteristik khas tiap kelompok berdasarkan nilai relatif dari kelima variabel tersebut. Poligon yang lebih besar mengindikasikan nilai variabel yang lebih tinggi, sedangkan poligon yang kecil mencerminkan nilai yang lebih rendah. Klaster 1 (biru) secara konsisten menunjukkan nilai tertinggi di seluruh variabel, yang mengindikasikan bahwa area yang termasuk dalam klaster ini memiliki kualitas air yang cenderung buruk, dengan kandungan padatan tersuspensi (TSS), padatan terlarut (TDS), konduktivitas listrik (EC), dan kandungan klorofil-a (CHLA) yang tinggi, serta pH yang relatif tinggi dibandingkan klaster lain. Klaster 2 (oranye), sebaliknya, memiliki nilai variabel yang jauh lebih rendah, menunjukkan kondisi kualitas air yang relatif lebih baik di antara semua klaster. Klaster 3 (hijau) dan Klaster 4 (merah) berada di tengah-tengah antara Klaster 1 dan 2, dengan Klaster 3 cenderung lebih tinggi dari Klaster 4 pada hampir semua variabel. Sementara itu, Klaster 5 (ungu) merupakan klaster dengan nilai variabel paling rendah secara ekstrem.
            Namun, berdasarkan peta dan <i>radar chart</i>, hasil ini menunjukkan beberapa keterbatasan, yang menandakan bahwa metode ini belum berhasil merepresentasikan kondisi kualitas air secara optimal di wilayah studi. Pertama, berdasarkan <i>radar chart</i>, Klaster 3 memiliki nilai rata-rata variabel yang tergolong tinggi, tidak jauh berbeda dengan Klaster 1. Namun secara spasial, Klaster 3 mendominasi badan sungai utama, yang berarti sungai digabung dalam satu klaster, sehingga kurang mencerminkan karakteristik airnya.          
          </p>
        </>
      )
    }
  ]
}
,
  {
    groupTitle: 'Metode Fuzzy C-Means (FCM)',
    items: [
    {
      text: (
        <>
          {/* TABEL */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            
              <div className="table-scroll-wrapper">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th >Metode</th>
                    <th>k</th>
                    <th>PC</th>
                    <th>PE</th>
                    <th>XB</th>
                    <th>WL</th>
                    <th>FSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><b>PCA</b></td><td>2</td><td>0.8447</td><td>0.2637</td><td>0.1464</td><td>0.0755</td><td>0.6957</td></tr>
                  <tr><td></td><td>3</td><td>0.7537</td><td>0.4462</td><td>0.3258</td><td>0.1242</td><td>0.6205</td></tr>
                  <tr><td></td><td>4</td><td>0.6946</td><td>0.5778</td><td>0.5452</td><td>0.1183</td><td>0.5777</td></tr>
                  <tr><td></td><td>5</td><td>0.6517</td><td>0.6835</td><td>0.7852</td><td>0.1183</td><td>0.5521</td></tr>

                  <tr><td><b><i>Equal Weight</i></b></td><td>2</td><td>0.8305</td><td>0.2867</td><td>0.1666</td><td>0.0853</td><td>0.6728</td></tr>
                  <tr><td></td><td>3</td><td>0.7192</td><td>0.5049</td><td>0.4051</td><td>0.1493</td><td>0.5816</td></tr>
                  <tr><td></td><td>4</td><td>0.6408</td><td>0.6745</td><td>0.7344</td><td>0.1563</td><td>0.5240</td></tr>
                  <tr><td></td><td>5</td><td>0.5806</td><td>0.8176</td><td>1.0974</td><td>0.1667</td><td>0.4854</td></tr>
                </tbody>
              </table>
            </div>
            </div>
          

          {/* PENJELASAN TABEL */}
          <p style={{ marginTop: '19px' }}>
            Tabel di atas menunjukkan evaluasi metode Fuzzy C-Means (FCM) dengan bobot sama pada tiap variabel. Kelima indeks evaluasi menunjukkan klaster 2 merupakan klaster paling optimal dengan nilai <i>Partition Coefficient</i> (PC) sebesar 0.8305, <i>Partition Entropy</i> (PE) sebesar 0.2867, Xie-Beni <i>Index</i> (XB) sebesar 0.1666, Wu-and-Li <i>Index</i> (WL) sebesar 0.0853, dan <i>Fuzzy Silhouette Index</i> (FSI) sebesar 0.6728. Nilai PC menurun dan PE meningkat seiring bertambahnya klaster, menandakan pembagian yang semakin tidak tegas. Xie-Beni <i>Index</i> (XB) naik signifikan pada klaster 5, menunjukkan struktur klaster yang kurang jelas. Wu-and-Li <i>Index</i> (WL) juga meningkat, sementara <i>Fuzzy Silhouette Index</i> (FSI) menurun, dengan nilai tertinggi pada klaster 2. Hasil ini menunjukkan bahwa 2 klaster merupakan pilihan optimal, karena memiliki pemisahan terbaik dan struktur klaster yang lebih stabil. Jika dibandingkan antara FCM dengan PCA dan FCM dengan <i>equal weight</i>, metode FCM dengan PCA memberikan indeks evaluasi yang lebih pada kelima indeks. Gambar di bawah menunjukkan hasil metode FCM dengan PCA menggunakan 2 klaster.          
          </p>

          {/* GAMBAR 1 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="petafcm.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 1 */}
          <p>
          </p>

          {/* GAMBAR 2 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="radarfcm.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 2 */}
          <p>
            <i>Radar chart</i> di atas menunjukkan hasil clustering menggunakan Fuzzy C-Means (FCM) dengan dua klaster berdasarkan variabel kualitas air. Klaster 1 (ditampilkan dalam warna biru) Klaster 1 menunjukkan nilai yang lebih tinggi pada semua variabel, yang mencerminkan air dengan kandungan tingkat keasaman yang lebih tinggi, padatan tersuspensi yang lebih tinggi, padatan terlarut yang lebih tinggi, aktivitas fitoplankton atau alga yang lebih tinggi, dan konsentrasi garam terlarut yang lebih tinggi. Sementara itu, Klaster 2 (warna oranye) menunjukkan nilai yang relatif rendah pada semua variabel, yang mencerminkan air dengan kandungan tingkat keasaman yang lebih rendah, padatan tersuspensi yang lebih rendah, padatan terlarut yang lebih rendah, aktivitas fitoplankton atau alga yang lebih rendah, dan konsentrasi garam terlarut yang lebih rendah.          
          </p>
        </>
      )
    }
  ]
}
,
  {
    groupTitle: <>Metode <i>Weighted Arithmetic Water Quality Index</i> (WAWQI)</>,
    items: [
    {
      text: (
        <>

          {/* GAMBAR 1 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="petawawqi.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 1 */}
          <p>
          </p>

          {/* GAMBAR 2 */}
          <div style={{ width: '100%', height: 'auto', margin: '16px 0' }}>
            <img
              src="radarwawqi2.png"
              alt="Visualisasi PCA"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* PENJELASAN GAMBAR 2 */}
        <p style={{ marginBottom: '16px' }}>
          <i>Radar chart</i> pada Gambar 23 menyajikan visualisasi komparatif terhadap lima kategori indeks kualitas air (WAWQI) berdasarkan lima variabel utama, yakni pH, <i>Total Suspended Solids</i> (TSS), <i>Total Dissolved Solids</i> (TDS), <i>Electrical Conductivity</i> (EC), dan <i>Chlorophyll-a</i> (CHLA). Setiap kategori kualitas air yaitu Sangat Baik, Baik, Buruk, Sangat Buruk, dan Tidak Layak memiliki karakteristik nilai rata-rata variabel yang berbeda, yang menggambarkan kondisi ekologis dan potensi pencemaran dari badan air yang diamati. 
        </p>

        <p style={{ marginBottom: '16px' }}>
          <b>Kategori Sangat Baik</b> ditandai oleh nilai EC yang paling rendah di antara seluruh kategori, mengindikasikan rendahnya konsentrasi ion-ion terlarut seperti garam, logam berat, dan anion-anion lain yang berkontribusi terhadap konduktivitas listrik dalam air. Kondisi ini mengarah pada kualitas kimia air yang sangat baik serta menunjukkan bahwa badan air tersebut belum banyak terpengaruh oleh masukan bahan-bahan terlarut dari aktivitas antropogenik atau alami. Selain itu, nilai TSS pada kategori ini berada di tingkat paling rendah, menunjukkan bahwa partikel padat yang tersuspensi seperti lumpur, pasir, dan material organik berada dalam konsentrasi minimal. Hal ini mencerminkan air yang jernih, yang sangat penting bagi penetrasi cahaya dan produktivitas ekosistem akuatik. TDS dalam kategori ini juga sangat rendah, yang berarti kandungan zat terlarut seperti mineral, senyawa organik, dan ion-ion kecil berada pada tingkat minimum. Nilai pH yang relatif mendekati netral pada kategori ini menunjukkan kestabilan kimia air yang baik. Kadar CHLA juga berada pada titik terendah, yang menandakan rendahnya produktivitas primer serta minimnya pertumbuhan alga atau fitoplankton.
	      </p>

        <p style={{ marginBottom: '16px' }}>
          <b>Kategori Baik</b> menunjukkan pola peningkatan nilai pada beberapa variabel dibandingkan kategori sebelumnya. EC mengalami peningkatan ringan, yang menunjukkan mulai adanya peningkatan konsentrasi ion-ion terlarut. TSS juga menunjukkan sedikit kenaikan, mengindikasikan peningkatan jumlah partikel padat tersuspensi, meskipun belum mengganggu secara signifikan kualitas air. Nilai TDS juga mengalamai kenaikan. Nilai pH cenderung sedikit meningkat namun tetap dalam kisaran netral hingga sedikit basa. Sementara itu, kadar CHLA masih rendah, menandakan bahwa belum terjadi peningkatan aktivitas fitoplankton yang berarti. Kategori ini mencerminkan perairan yang mulai terpapar tekanan lingkungan, namun belum mengalami degradasi kualitas air yang serius.
        </p>

        <p style={{ marginBottom: '16px' }}>
          <b>Kategori Buruk</b> menunjukkan perubahan variabel yang lebih mencolok dibandingkan dua kategori sebelumnya. TSS mengalami peningkatan, yang menunjukkan bahwa badan air mulai mengalami gangguan fisik berupa kekeruhan tinggi. TDS juga menunjukkan akumulasi zat terlarut dalam jumlah yang lebih besar. EC mengalami peningkatan ringan, yang menunjukkan mulai adanya peningkatan konsentrasi ion-ion terlarut. Nilai pH dan CHLA juga menunjukkan tren peningkatan, di mana kenaikan pH bisa mengindikasikan reaksi kimia tertentu atau masukan basa dari limbah, sementara peningkatan CHLA mencerminkan awal mula eutrofikasi akibat tingginya nutrien (misalnya nitrogen dan fosfor) yang mendukung pertumbuhan alga. Kondisi ini mengindikasikan badan air yang berisiko menurunkan daya dukung ekologis.        
        </p>

        <p style={{ marginBottom: '16px' }}>
          <b>Kategori Sangat Buruk</b> ditandai oleh peningkatan yang lebih tinggi pada sebagian besar variabel. Nilai TSS berada pada tingkat yang tinggi, yang berarti perairan sangat keruh dan mengandung banyak material padat, yang bisa mengganggu fotosintesis, respirasi organisme akuatik, serta menurunkan visibilitas air. TDS juga meningkat drastis, mengindikasikan pencemaran kimia yang parah dari zat-zat terlarut. EC dalam kategori ini juga mengalami peningkatan dibandingkan kategori sebelumnya yang menunjukkan mulai adanya peningkatan konsentrasi ion-ion terlarut. Nilai pH tetap tinggi, mengindikasikan kondisi basa yang tidak mendukung keseimbangan ekosistem perairan. Sementara itu, CHLA terus meningkat, yang menandakan tingginya aktivitas alga yang dapat menyebabkan gangguan pada ekosistem perairan seperti penurunan kadar <i>Dissolved Oxygen</i> (DO).
        </p>

        <p style={{ marginBottom: '16px' }}>
          <b>Kategori Tidak Layak</b> merupakan kondisi kualitas air terburuk dalam klasifikasi ini, dengan hampir seluruh variabel menunjukkan nilai ekstrem. TSS dan TDS berada pada level tertinggi, menandakan kombinasi dari kekeruhan dan kandungan zat terlarut yang sangat tinggi. Kadar pH berada pada tingkat tertinggi, yang menunjukkan ketidakseimbangan kimia air yang dapat membahayakan organisme akuatik maupun kesehatan manusia. CHLA mengalami lonjakan paling tinggi, menjadi indikator utama dari eutrofikasi. EC menunjukkan kenaikan signifikan, yang menunjukkan peningkatan konsentrasi ion-ion terlarut yang sangat tinggi. Kombinasi variabel ini menggambarkan air yang sangat tercemar, sehingga air dalam kategori ini dinyatakan tidak layak atau digunakan untuk keperluan dasar manusia.
        </p>

        </>
      )
    }
  ]
}
,
  {
    groupTitle: <><i>Ground Truth</i></>,
    items: [
      {
        text: <>Sebagai bagian dari proses validasi terhadap hasil klasifikasi kualitas air menggunakan indeks WAWQI, dilakukan <i>ground truth</i> berdasarkan lima kategori kualitas air yang telah diidentifikasi, yaitu: Sangat Baik, Baik, Buruk, Sangat Buruk, dan Tidak layak. Untuk setiap kategori, dipilih tiga titik lokasi yang merepresentasikan karakteristik spasial dan visual dari masing-masing tingkat kualitas air.Pada panel (a), area sungai terlihat dikategorikan ke dalam lima kategori kualitas air, mulai dari “Sangat Baik” hingga “Tidak Layak”. Panel (b) memperlihatkan pembesaran area selektif seluas 220 × 220 meter, yang ditandai dengan kotak biru. Luasan ini dipilih untuk memberikan konteks spasial yang lebih luas terhadap kondisi sekitar titik kritis. Di dalam kotak biru tersebut, ditandai sebuah grid merah berukuran 20 × 20 meter, yang berdasarkan hasil analisis dikategorikan sebagai Sangat Baik, Baik, Buruk, Sangat Buruk, atau Tidak Layak. Penentuan kategori ini merujuk pada baku mutu air sungai Kelas II sebagaimana diatur dalam Peraturan Pemerintah Republik Indonesia Nomor 22 Tahun 2021, yang peruntukannya bukan untuk air minum, melainkan untuk kegiatan seperti rekreasi air, pembudidayaan ikan air tawar, peternakan, pengairan pertanaman, dan peruntukan lain yang setara.</>
      }
    ]
  }
]
,
  speech:
    <>Berikut merupakan hasil penelitian yang menggunakan metode klasterisasi yaitu K-Means dan Fuzzy C-Means (FCM), serta metode indeks <i> Weighted Arithmetic Water Quality Index </i> (WAWQI).</>      
  }
,
];

const chatDialogs = [
  {
    sender: 'penjaga',
    text: 'Halo! Saya Baginda. Yuk, kita pelajari kualitas air Sungai Batanghari bersama-sama. Apakah kamu siap?',
  },
  {
    sender: 'user',
    text: 'Siappp!',
  },
  {
    sender: 'penjaga',
    text: 'Mari kita mulai!',
  },
];


const Scrollytelling = () => {
  const swiperRef = useRef(null);
  const getInitialStepFromHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const routes = ['beranda', 'batanghari', 'masalah', 'lokasi', 'metode', 'variabel', 'hasil'];
    const index = routes.indexOf(hash);
    return index !== -1 ? index : 0;
  };

  const [currentStep, setCurrentStep] = useState(getInitialStepFromHash()); // Menandai bagian webstory mana yang sedang ditampilkan (0 = Beranda), dst
  
  // Mengatur efek ketik pada awal
  const [chatIndex, setChatIndex] = useState(0);
  const [chatFinished, setChatFinished] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const [isTransitioning, setIsTransitioning] = useState(false); //Transformasi ke konten selanjutnya
  const typingTimeout = useRef(null);
  const [showChat, setShowChat] = useState(true);
  const groundTruthSwiperRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  useEffect(() => {
    if (currentStep === 0 && !chatFinished && showChat) {
      setTypedText('');
      setIsTyping(true);

      const fullText = chatDialogs[chatIndex].text;
      let currentCharIndex = 0;
      let displayedText = '';

      function typeNextChar() {
        if (currentCharIndex < fullText.length) {
          displayedText += fullText.charAt(currentCharIndex);
          setTypedText(displayedText);
          currentCharIndex++;
          typingTimeout.current = setTimeout(typeNextChar, 40);
        } else {
          setIsTyping(false);
        }
      }

      typeNextChar();

      return () => clearTimeout(typingTimeout.current);
    }
  }, [chatIndex, currentStep, chatFinished, showChat]);



//Saat chat selesai dan user klik, terjadi: Animasi fade-out selama 800ms

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setShowChat(false);
        setChatFinished(true);
        setCurrentStep(1); //masuk ke konten pertama
        setIsTransitioning(false);
      }, 800); // durasi fade-out

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Reset saat kembali ke beranda, jika user kembali ke step 0, semua state percakapan di-reset.
  useEffect(() => {
    if (currentStep === 0) {
      setShowChat(true);
      setChatFinished(false);
      setChatIndex(0);
      setTypedText('');
      setIsTyping(true);
    }
  }, [currentStep]);

  // Setiap user pindah ke step baru, slide image kembali ke gambar pertama agar kontennya konsisten.
  useEffect(() => {
    if (swiperRef.current && imageSlides[currentStep + 0]) {
      swiperRef.current.slideTo(0, 0); // langsung pindah tanpa animasi
    }
  }, [currentStep, imageSlides]);


// User bisa klik untuk lanjut dialog. jika sudah habis, lanjut ke konten.
const handleChatClick = () => {
  if (isTyping || isTransitioning) return;

  if (chatIndex < chatDialogs.length - 1) {
    setTypedText('');  // Reset typedText
    setChatIndex(chatIndex + 1);
    setIsTyping(true); // Mulai typing
  } else {
    setIsTransitioning(true);
  }
};

// Tombol menu untuk langsung lompat ke topik tertentu.
const goToStep = (index) => {
  setCurrentStep(index);
  setChatIndex(0);
  setChatFinished(false);
  setTypedText('');
  setIsTyping(true);
  window.location.hash = ['beranda', 'batanghari', 'masalah', 'lokasi', 'metode', 'variabel', 'hasil'][index];
  window.scrollTo(0, 0);
  setIsMenuOpen(false);
};

  const nextStep = () => {
    if (currentStep < steps.length - 1) goToStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const narratorImages = {
  0: 'ikon_awal.png',     // Beranda
  1: 'ikon_sungai.png',   // Batanghari
  2: 'ikon_masalah.png',  // Masalah
  3: 'ikon_awal.png',     // lokasi
  4: 'ikon_metode.png',   // Metode
  5: 'ikon_awal.png',     // Variabel
  6: 'ikon_awal.png',     // Hasil
};



  return (
  <>
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">Batanghari WQI</div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {steps.map((step, i) => (
            <a
              key={i}
              href={`#${['beranda', 'batanghari', 'masalah', 'lokasi', 'metode', 'variabel', 'hasil'][i]}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = ['beranda', 'batanghari', 'masalah', 'lokasi', 'metode', 'variabel', 'hasil'][i];
                goToStep(i);
              }}
            >
              {['Beranda', 'Batanghari', 'Masalah', 'Lokasi', 'Metode', 'Variabel', 'Hasil'][i]}
            </a>
          ))}
        </nav>
      </div>
    </header>

    <div className="container">
      {currentStep === 0 && showChat ? (
        <section
          className={`chat-container ${isTransitioning ? 'fade-out' : ''}`}
          onClick={handleChatClick}
          role="button"
          tabIndex={0}
          aria-label="Dialog interaktif Penjaga Sungai dan pengguna"
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isTyping && !isTransitioning) {
              handleChatClick();
            }
          }}
        >
          {chatDialogs.slice(0, chatIndex).map((chat, i) => (
            <div key={i} className={`chat-message ${chat.sender === 'penjaga' ? 'penjaga-msg' : 'user-msg'}`}>
              <div className="profile-pic">
                {chat.sender === 'penjaga' ? (
                  <img
                    src={narratorImages[currentStep] || 'ikon_sungai.png'}
                    alt="Penjaga Sungai"
                    className="profile-image"
                  />
                ) : null}
              </div>
              <div className="chat-bubble">{chat.text}</div>
            </div>
          ))}

          {chatIndex < chatDialogs.length && (
            <div className={`chat-message ${chatDialogs[chatIndex].sender === 'penjaga' ? 'penjaga-msg' : 'user-msg'}`}>
              <div className="profile-pic">
                {chatDialogs[chatIndex].sender === 'penjaga' && (
                  <img src="ikon_awal.png" alt="Penjaga Sungai" className="profile-image" />
                )}
              </div>
              <div className="chat-bubble">{typedText}</div>
            </div>
          )}

          <div className="chat-instruction">
            {isTyping ? 'Sedang mengetik...' : '(Klik untuk lanjut...)'}
          </div>
        </section>
      ) : (
        <>
          <section className="intro">
            <div className="intro-icon">
              <img
                src={narratorImages[currentStep] || 'ikon_sungai.png'}
                alt="Ikon narator"
                className="profile-image"
                style={{ width: 90, height: 90 }}
              />
            </div>
            <div className="intro-text">
              <h2 style={{ fontWeight: 'bold' }}>{steps[currentStep].speech}</h2>
            </div>
          </section>


           {imageSlides[currentStep + 0] && (
              <div className="image-slider-wrapper relative w-full max-w-4xl mx-auto">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  className="mySwiper custom-swiper"
                >
                  {imageSlides[currentStep + 0].map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="image-slider">
                        <div className="image-container">
                          <img src={item.src} alt={item.alt} />
                          <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="nav-arrow left-2"
                            aria-label="Gambar sebelumnya"
                          >
                            <ChevronLeft size={28} />
                          </button>
                          
                          <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="nav-arrow right-2"
                            aria-label="Gambar berikutnya"
                          >
                            <ChevronRight size={28} />
                          </button>
                        </div>
                        <p className="image-source">{item.source}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <main className="card">
              <h2>{steps[currentStep].title}</h2>

                {Array.isArray(steps[currentStep].description) && steps[currentStep].description[0]?.items ? (
                  <>
                    <div className="description-group-container">
                      {steps[currentStep].description.map((group, groupIdx) => (
                        <div 
                          key={groupIdx} 
                          className={`description-group ${group.layout === 'horizontal' ? 'horizontal-group' : ''}`}
                        >
                          <h3 className="group-title">{group.groupTitle}</h3>
                          <div className="description-items">
                            {group.items.map((desc, itemIdx) => (
                              <div key={itemIdx} className="description-array-item">
                                <h4 className="description-array-item-title">{desc.title}</h4>
                                <p>{desc.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {currentStep === 6 && (
                      <section className="image-slider-wrapper relative w-full max-w-4xl mx-auto">
                        <Swiper
                          modules={[Pagination]}
                          pagination={{ clickable: true }}
                          spaceBetween={30}
                          slidesPerView={1}
                          loop={true}
                          onSwiper={(swiper) => (swiperRef.current = swiper)}
                          className="mySwiper custom-swiper"
                        >
                          {groundTruthSlides.map((item, index) => (
                            <SwiperSlide key={index}>
                              <div className="image-slider">
                                <div className="image-container relative w-fit mx-auto">
                                  <img
                                    src={item.image}
                                    alt={`Dokumentasi Ground Truth ${index + 1}`}
                                    className="rounded-image"
                                  />
                                  <button
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    className="nav-arrow left-2 top-1/2 -translate-y-1/2"
                                    aria-label="Gambar sebelumnya"
                                  >
                                    <ChevronLeft size={28} />
                                  </button>
                                  <button
                                    onClick={() => swiperRef.current?.slideNext()}
                                    className="nav-arrow right-2 top-1/2 -translate-y-1/2"
                                    aria-label="Gambar berikutnya"
                                  >
                                    <ChevronRight size={28} />
                                  </button>
                                </div>
                                <h3 className="text-center mt-4 text-black font-bold text-xl">{item.caption}</h3>
                                <p className="text-center mt-2 text-blue-700 text-base">{item.caption2}</p>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </section>
                    )}
                  </>
                ) : (
                  steps[currentStep].description.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))
                )}
              </main>

              <div className="navigation-footer">
                <button onClick={prevStep} disabled={currentStep === 0}>
                  Sebelumnya
                </button>
                <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
                  Berikutnya
                </button>
              </div>
            </>
          )}

          <footer className="footer">
            <p>© 2024 Batanghari WQI</p>
          </footer>
        </div>
      </>
    );
};

export default Scrollytelling;