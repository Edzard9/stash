# Example output

Produced by following this skill. The observation data is from a real
Inter-VLAN Routing practicum run in Cisco Packet Tracer on 30 October
2026 (ping to the gateway, ping across VLANs, and a traceroute, all
verified live during the session). The identity block is shown with
placeholders.

---

Nama  : [Nama Mahasiswa]
NPM   : [NPM]
Kelas : [Kelas]

LAPORAN PRAKTIKUM: INTER-VLAN ROUTING

Hasil Pengamatan
1. Ping dari PC-A (VLAN 10) ke gateway VLAN-nya sendiri, 192.168.10.1,
   berhasil dengan packet loss 0%.
   Artinya: PC-A sudah terhubung dengan benar ke VLAN 10 dan gateway
   untuk VLAN tersebut aktif.
2. Ping dari PC-A (VLAN 10) ke PC-B di VLAN 20, 192.168.20.10, berhasil
   dengan packet loss 0%.
   Artinya: komunikasi antar-VLAN berjalan; router berhasil meneruskan
   paket dari VLAN 10 ke VLAN 20.
3. Tracert dari PC-A ke PC-B menunjukkan 2 hop: hop pertama ke gateway
   192.168.10.1, hop kedua langsung ke PC-B.
   Artinya: jalur paket sesuai teori inter-VLAN routing, yaitu keluar
   lewat gateway VLAN asal lalu diteruskan router ke VLAN tujuan.

Kesimpulan
Inter-VLAN routing berhasil dikonfigurasi. Perangkat di VLAN 10 dan
VLAN 20 dapat saling berkomunikasi melalui router sebagai gateway,
dibuktikan dengan ping yang berhasil tanpa packet loss dan jalur
tracert yang sesuai.

Lembar Hasil Pengamatan
| No | Kegiatan | Hasil |
|----|----------|-------|
| 1 | Ping PC-A ke gateway 192.168.10.1 | Berhasil, packet loss 0% |
| 2 | Ping PC-A ke PC-B 192.168.20.10 | Berhasil, packet loss 0% |
| 3 | Tracert PC-A ke PC-B | 2 hop, sesuai jalur routing |

Soal Evaluasi
1. Mengapa perangkat di VLAN berbeda tidak bisa langsung berkomunikasi
   tanpa router?
   Jawab: Karena setiap VLAN adalah broadcast domain dan jaringan yang
   terpisah. Agar paket bisa berpindah antarjaringan, diperlukan
   perangkat layer 3, yaitu router, untuk meneruskannya.
2. Apa fungsi subinterface pada router di konfigurasi router-on-a-stick?
   Jawab: Subinterface membagi satu interface fisik router menjadi
   beberapa interface logis, satu untuk setiap VLAN, dan masing-masing
   menjadi gateway bagi VLAN-nya.
