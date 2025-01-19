const natural = require('natural');

class ChatbotHandler {
  constructor() {
    this.vectorizer = new natural.TfIdf();
    this.data = {
      indonesia: [
        {
            "question": "Tentang D'SNAP! ?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Apa yang dimaksud dengan D'SNAP! ?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Apa fokus utama dari D'SNAP?",
            "answer": "D'SNAP adalah Event Organizer yang berfokus pada penyediaan layanan aktivasi acara dan strategi branding untuk klien. Perusahaan ini berdedikasi untuk memberikan hasil berkualitas tinggi dengan menyeimbangkan kreativitas, inovasi, dan kepuasan klien."
        },
        {
            "question": "Dimana lokasi kantor D'SNAP?",
            "answer": "Kantor D'SNAP berlokasi di @ Radio Dalam, Jakarta. Perusahaan ini telah beroperasi sejak Mei 2010 dengan tim yang terdiri dari 20 karyawan dari berbagai divisi seperti Akun, Produksi, Konsep, dan Kreatif."
        },
        {
            "question": "Apa saja nilai-nilai inti dari D'SNAP?",
            "answer": "Nilai-nilai inti D'SNAP mencakup kreativitas, inovasi, kepuasan klien, serta dedikasi untuk menghasilkan karya berkualitas tinggi yang melampaui harapan klien."
        },
        {
            "question": "Layanan apa yang ditawarkan oleh D'SNAP?",
            "answer": "D'SNAP menawarkan berbagai layanan aktivasi acara seperti peluncuran produk, konser musik, acara olahraga, perayaan komunitas, dan acara kuliner. Mereka juga menyediakan layanan pendukung seperti desain grafis, teknologi audiovisual, dan dokumentasi acara."
        },
        {
            "question": "Apa saja acara yang bisa dikelola oleh D'SNAP?",
            "answer": "D'SNAP berpengalaman dalam mengelola berbagai jenis acara seperti peluncuran produk, konser, perayaan komunitas, acara olahraga, dan acara kuliner, dengan memastikan setiap detail acara terencana dengan baik."
        },
        {
            "question": "Apakah D'SNAP memiliki pengalaman dengan acara di luar Jakarta?",
            "answer": "Ya, D'SNAP memiliki pengalaman mengelola acara di berbagai kota di Indonesia, termasuk Jakarta, Bandung, Surabaya, Medan, dan kota-kota lainnya, dengan adaptasi terhadap budaya dan kebutuhan lokal."
        },
        {
            "question": "Bagaimana cara menghubungi D'SNAP untuk konsultasi acara?",
            "answer": "Anda dapat menghubungi D'SNAP melalui kontak yang tersedia di website atau halaman reservasi untuk konsultasi lebih lanjut mengenai perencanaan acara."
        },
        {
            "question": "Apa yang membuat D'SNAP unggul dibandingkan Event Organizer lainnya?",
            "answer": "D'SNAP unggul dengan pendekatan berbasis tim yang solid, pemahaman mendalam terhadap kebutuhan klien, serta perencanaan strategis yang fleksibel untuk memastikan hasil yang optimal."
        },
        {
            "question": "Apakah D'SNAP menawarkan layanan untuk acara hibrid?",
            "answer": "Ya, D'SNAP memiliki pengalaman dalam menyelenggarakan acara virtual dan hibrid, menyediakan teknologi seperti live streaming, platform interaktif, dan integrasi media sosial untuk mendukung acara tersebut."
        },
        {
            "question": "Perusahaan apa ini?",
            "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
          "question": "Apa itu D'SNAP! ?",
          "answer": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
        },
        {
            "question": "Kelebihan D'SNAP! ?",
            "answer": "Kami percaya bahwa kesuksesan berasal dari kerja tim yang kuat, di mana setiap divisi dalam tim kami berkomitmen untuk pertumbuhan dan kolaborasi, baik secara internal maupun dengan klien kami sebagai mitra. Dengan memahami secara mendalam kebutuhan klien, produk, target pasar, dan tujuan mereka, kami memberikan strategi praktis yang terarah untuk melampaui harapan. Dengan profesionalisme, energi, dan efisiensi, kami merancang solusi komunikasi yang berdampak yang menyeimbangkan efektivitas biaya dan hasil. Dipandu oleh perencanaan yang teliti dan kelincahan, kami tetap fleksibel dan adaptif untuk mengatasi tantangan dan meraih peluang, memastikan hasil terbaik untuk klien kami."
        },
        {
          "question": "Layanan Event apa saja yang diselenggarakan oleh D'SNAP! ?",
          "answer": "Kami berpengalaman dalam mengadakan acara besar seperti peluncuran produk, perayaan komunitas, konser, acara olahraga, dan kuliner😊."
        },
        {
            "question": "Benefit apa saja yang didapatkan?",
            "answer": "Booth, Perencanaan & Manajemen Acara, Dekorasi & Desain Set, Dukungan Teknologi & AV, Talent & Hiburan, Promosi & Pemasaran Acara, Layanan Katering & Makanan, Pendaftaran & Tiket, dan Fotografi & Videografi Acara."
        },
        {
            "question": "Berapa biaya untuk mengadakan acara?",
            "answer": "Saat ini, kami hanya menyediakan acara untuk Perayaan Komunitas, Peluncuran Produk, Konferensi, Konser Musik, Acara Olahraga, dan Acara Kuliner. Untuk rincian biaya penyelenggaraan bisakah anda beritahu acara apa yang ingin anda ketahui biayanya?"
        },
        {
            "question": "Apakah layanan tersedia di seluruh Indonesia?",
            "answer": "Tentu saja, kami telah berhasil menyelenggarakan dan mengelola acara di berbagai kota di Indonesia, menunjukkan kemampuan kami untuk beradaptasi dengan berbagai budaya lokal dan lingkungan bisnis. Pengalaman kami mencakup area metropolitan besar seperti Jakarta, Bandung, Surabaya, Malang, Lampung, dan Medan, serta banyak kota lainnya. Setiap acara dilaksanakan dengan tingkat dedikasi dan perhatian terhadap detail yang sama, memastikan bahwa tujuan klien kami tercapai, tidak peduli lokasi acara. Jangkauan kami yang luas di seluruh Indonesia memungkinkan kami untuk membawa layanan kami kepada berbagai klien, menciptakan pengalaman yang berkesan dan berdampak, disesuaikan dengan karakteristik dan audiens unik di setiap daerah."
        },
        {
            "question": "Keunggulan D'SNAP! ?",
            "answer": "Kami percaya bahwa kesuksesan datang dari kerja tim yang kuat, di mana setiap divisi dalam tim kami berkomitmen untuk pertumbuhan dan kolaborasi, baik secara internal maupun dengan klien kami sebagai mitra. Dengan memahami secara mendalam kebutuhan klien, produk, pasar sasaran, dan tujuan mereka, kami memberikan strategi praktis yang berfokus pada target untuk melebihi harapan. Dengan profesionalisme, energi, dan efisiensi, kami menciptakan solusi komunikasi yang berdampak yang menyeimbangkan efektivitas biaya dan hasil. Dipandu oleh perencanaan yang cermat dan kelincahan, kami tetap fleksibel dan adaptif untuk mengatasi tantangan dan meraih peluang, memastikan hasil terbaik bagi klien kami."
        },
        // estimasi biaya
        {
            "question": "Perayaan Komunitas",
            "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan perayaan komunitas ?",
          "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Peluncuran Produk",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan peluncuran produk ?",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Konferensi",
          "answer": "Untuk menyelenggarakan konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan konferensi ?",
          "answer": "Untuk menyelenggarakan konferensi konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Olahraga",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Olahraga ?",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00. Untuk informasi lebih lengkap silahkan hubungi kontak kami."
        },
        {
          "question": "Bagaimana cara booking event ?",
          "answer": "Anda bisa ke halaman reservasi untuk informasi lebih lengkap atau juga bisa menghubungi kontak yang tertera."
        },
        {
          "question": "Bagaimana cara memesan jasa ?",
          "answer": "Anda bisa ke halaman reservasi untuk informasi lebih lengkap atau juga bisa menghubungi kontak yang tertera."
        },
        {
          "question": "Apakah D'SNAP menyediakan layanan konsultasi sebelum acara?",
          "answer": "Ya, D'SNAP menyediakan layanan konsultasi, silahkan hubungi kontak yang tertera. Tim kami akan membantu merancang konsep acara yang sesuai dengan visi Anda."
        },
        {
          "question": "Apakah D'SNAP menyediakan layanan dokumentasi acara?",
          "answer": "Tentu saja, kami menyediakan layanan dokumentasi acara seperti fotografi dan videografi profesional untuk memastikan momen penting Anda terdokumentasi dengan baik."
        },
        {
          "question": "Apakah D'SNAP menawarkan layanan desain grafis untuk acara?",
          "answer": "Ya, kami menawarkan layanan desain grafis untuk mendukung materi promosi dan visual acara, seperti undangan, poster, backdrop, dan materi lainnya."
        },
        {
          "question": "Apakah D'SNAP dapat menangani acara virtual atau hybrid?",
          "answer": "Ya, D'SNAP memiliki pengalaman dalam mengelola acara virtual dan hybrid. Kami menyediakan solusi teknologi yang sesuai, termasuk live streaming, platform interaktif, dan integrasi media sosial."
        },
        {
          "question": "Apakah D'SNAP memiliki jaringan vendor pendukung acara?",
          "answer": "Ya, kami memiliki jaringan vendor terpercaya untuk berbagai kebutuhan acara, seperti katering, dekorasi, perlengkapan audiovisual, dan lain-lain."
        },
        {
          "question": "Berapa lama waktu yang dibutuhkan untuk persiapan acara?",
          "answer": "Waktu persiapan bergantung pada skala dan kompleksitas acara. Untuk acara kecil hingga menengah, biasanya memerlukan waktu 2-4 minggu. Sedangkan acara besar dapat memerlukan waktu 1-3 bulan."
        },
        {
          "question": "Apakah D'SNAP menawarkan paket acara yang sudah jadi?",
          "answer": "Ya, kami menyediakan paket acara yang sudah dirancang sebelumnya untuk memudahkan Anda, seperti paket peluncuran produk, pesta komunitas, dan konser musik. Detailnya dapat Anda temukan di halaman reservasi."
        },
        {
          "question": "Apakah saya bisa custom paket acara di D'SNAP?",
          "answer": "Tentu saja! Anda dapat berkonsultasi dengan tim kami untuk merancang paket acara yang sesuai dengan kebutuhan dan anggaran Anda."
        },
        {
          "question": "Bagaimana D'SNAP menangani tantangan atau perubahan mendadak selama acara?",
          "answer": "Kami memiliki tim yang berpengalaman dan responsif untuk menangani setiap tantangan atau perubahan mendadak dengan solusi cepat dan efektif demi keberhasilan acara Anda."
        },
        {
          "question": "Apa yang membedakan D'SNAP dari event organizer lainnya?",
          "answer": "Keunggulan kami terletak pada kreativitas, dedikasi, dan pengalaman dalam mengelola berbagai jenis acara. Kami selalu mengutamakan kepuasan klien dengan memberikan solusi acara yang inovatif dan hasil yang melampaui harapan."
        }
      ], 
      
      english: [
        {
            "question": "What is D'SNAP! company ?",
            "answer": "D'SNAP is an Event Organizer that provides a multitude of services in strategic event/brand activation for the clients. D'SNAP started its operation in May 2010 and now occupies @ Radio Dalam, Jakarta. with 20 employees (Account, Production, Concept, & Creative Division). Each member is dedicated to delivering high-quality work that embodies the company's core values: creativity, innovation, and client satisfaction😊"
        },
        {
          "question": "About the D'SNAP! company ?",
          "answer": "D'SNAP is an Event Organizer that provides a multitude of services in strategic event/brand activation for the clients. D'SNAP started its operation in May 2010 and now occupies @ Radio Dalam, Jakarta. with 20 employees (Account, Production, Concept, & Creative Division). Each member is dedicated to delivering high-quality work that embodies the company's core values: creativity, innovation, and client satisfaction😊"
        },
        {
          "question": "What is the process for organizing an event with D'SNAP?",
          "answer": "To organize an event with D'SNAP, simply contact us for an initial consultation. We will discuss your needs, budget, and preferences, and then create a customized plan for your event. After approval, we manage all aspects of the event planning and execution."
        },
        {
          "question": "How can D'SNAP help with event marketing?",
          "answer": "D'SNAP offers comprehensive event marketing services, including social media promotion, email marketing, influencer partnerships, and media relations. We work with you to develop a marketing strategy that increases visibility and attendance for your event."
        },
        {
          "question": "Does D'SNAP handle the logistics of event transportation?",
          "answer": "Yes, D'SNAP manages all transportation logistics, including arranging for guest travel, shuttle services, and managing transportation schedules to ensure that attendees arrive on time and comfortably."
        },
        {
          "question": "Can D'SNAP provide live entertainment for events?",
          "answer": "Yes, D'SNAP has a network of entertainers, including musicians, DJs, performers, and speakers. We can arrange live entertainment that fits your event's theme and atmosphere, ensuring a memorable experience for your guests."
        },
        {
          "question": "Does D'SNAP assist with event budgeting?",
          "answer": "Yes, D'SNAP works closely with clients to create a realistic and transparent budget for each event. We help prioritize expenses, recommend cost-saving solutions, and ensure that your event stays within the budget without compromising quality."
        },
        {
          "question": "Can D'SNAP offer virtual event services?",
          "answer": "Yes, D'SNAP provides full virtual event planning services, including platform selection, live streaming, audience interaction features, and technical support to ensure a smooth and engaging online experience for your attendees."
        },
        {
          "question": "Does D'SNAP offer team-building activities for corporate events?",
          "answer": "Yes, D'SNAP can incorporate team-building activities into your corporate events, providing a range of interactive experiences designed to improve communication, collaboration, and employee engagement."
        },
        {
          "question": "How does D'SNAP handle event coordination on the day of the event?",
          "answer": "On the day of the event, D'SNAP's team ensures smooth coordination by overseeing all event logistics, including guest arrivals, speaker management, technical setup, and troubleshooting, ensuring everything runs as planned."
        },
        {
          "question": "Does D'SNAP offer event photography and videography services?",
          "answer": "Yes, D'SNAP provides professional event photography and videography services to capture key moments of your event. Our team ensures high-quality visuals that can be used for marketing, social media, or personal keepsakes."
        },
        {
          "question": "Can D'SNAP provide custom event themes and decorations?",
          "answer": "Yes, D'SNAP offers custom event theme design and decorations. Whether it’s a corporate event, wedding, or festival, we can create unique, branded environments that reflect the spirit and objectives of your event."
        },
        {
          "question": "Does D'SNAP provide event safety and security services?",
          "answer": "Yes, D'SNAP can arrange for event safety and security services, including crowd management, emergency response planning, and on-site security personnel to ensure the safety of all attendees."
        },
        {
          "question": "How can D'SNAP assist with event follow-up and feedback collection?",
          "answer": "After your event, D'SNAP assists with gathering attendee feedback through surveys and follow-up communications. This helps assess the success of the event and gather insights for future improvements."
        },
        {
          "question": "Can D'SNAP provide event catering services?",
          "answer": "Yes, D'SNAP offers event catering services, with a wide range of menu options to suit different dietary needs and preferences. Our catering services ensure that food and beverages enhance the overall experience of your event."
        },
        {
          "question": "How does D'SNAP handle unforeseen challenges during events?",
          "answer": "D'SNAP is prepared to handle unforeseen challenges with flexibility and professionalism. Our team quickly addresses any issues that arise, ensuring that the event continues smoothly without any disruption."
        },
        {
          "question": "Does D'SNAP offer post-event content creation services?",
          "answer": "Yes, D'SNAP offers post-event content creation, including highlight videos, social media posts, and photo albums to share the success of your event with your audience and keep the engagement going after the event."
        },
        {
            "question": "What are D'SNAP!'s strengths?",
            "answer": "We believe that success comes from strong teamwork, where every division in our team is committed to growth and collaboration, both internally and with our clients as partners. By deeply understanding our clients’ needs, products, target market, and goals, we deliver practical, target-driven strategies to exceed expectations. With professionalism, energy, and efficiency, we craft impactful communication solutions that balance cost-effectiveness and results. Guided by meticulous planning and agility, we remain flexible and adaptive to overcome challenges and seize opportunities, ensuring the best outcomes for our clients."
        },
        {
            "question": "D'SNAP!'s advantages?",
            "answer": "We believe that success comes from strong teamwork, where every division in our team is committed to growth and collaboration, both internally and with our clients as partners. By deeply understanding our clients’ needs, products, target market, and goals, we deliver practical, target-driven strategies to exceed expectations. With professionalism, energy, and efficiency, we craft impactful communication solutions that balance cost-effectiveness and results. Guided by meticulous planning and agility, we remain flexible and adaptive to overcome challenges and seize opportunities, ensuring the best outcomes for our clients."
        },
        {
            "question": "Benefit of D'SNAP! company ?",
            "answer": "Booth, Event Planning & Management, Set Decoration & Design, Technology & AV Support, Talent & Entertainment, Event Promotion & Marketing, Catering & Food Services, Registration & Tickets, and Event Photography & Videography."
        },
        {
            "question": "What kind events does D'SNAP! handle?",
            "answer": "We have experience in organizing large events such as product launches, community celebrations, concerts, sports events, and culinary events😊"
        },
        {
            "question": "How much does it cost to organize an event?",
            "answer": "Currently, we only provide events for Community Celebrations, Product Launches, Conferences, Music Concerts, Sports Events, and Culinary Events. For detailed cost information, could you let us know which event you would like to inquire about?"
        },
        {
            "question": "Can D'SNAP! services be provided across all regions in Indonesia?",
            "answer": "Of course, we have successfully organized and managed events in numerous cities across Indonesia, showcasing our ability to adapt to various local cultures and business environments. Our experience spans major metropolitan areas like Jakarta, Bandung, Surabaya, Malang, Lampung, and Medan, among many others. Each event is executed with the same level of dedication and attention to detail, ensuring that our clients' objectives are met, no matter the location. This extensive reach across the country allows us to bring our services to a wide range of clients, creating memorable and impactful experiences tailored to each region's unique characteristics and audience."
        },
        {
            "question": "What are D'SNAP!'s advantage?",
            "answer": "We believe that success comes from strong teamwork, where every division in our team is committed to growth and collaboration, both internally and with our clients as partners. By deeply understanding our clients’ needs, products, target market, and goals, we deliver practical, target-driven strategies to exceed expectations. With professionalism, energy, and efficiency, we craft impactful communication solutions that balance cost-effectiveness and results. Guided by meticulous planning and agility, we remain flexible and adaptive to overcome challenges and seize opportunities, ensuring the best outcomes for our clients."
        },
        // cost
        {
          "question": "Community Celebration",
          "answer": "To organize a community celebration, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "How much does it cost to organize a community celebration?",
          "answer": "To organize a community celebration, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "Product Launch",
          "answer": "To organize a product launch, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00."
        },
        {
          "question": "How much does it cost to organize a product launch?",
          "answer": "To organize a product launch, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00."
        },
        {
          "question": "Corporate Conference",
          "answer": "To organize a corporate conference, you can choose the small event option on the Reservation page, with prices starting from IDR 10,000,000.00."
        },
        {
          "question": "How much does it cost to organize a corporate conference?",
          "answer": "To organize a corporate conference, you can choose the small event option on the Reservation page, with prices starting from IDR 10,000,000.00."
        },
        {
          "question": "Musical",
          "answer": "To organize a musical event, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00."
        },
        {
          "question": "How much does it cost to organize a musical ?",
          "answer": "To organize a musical event, you can choose the large event option on the Reservation page, with prices starting from IDR 50,000,000.00."
        },
        {
          "question": "Sports",
          "answer": "To organize a sports event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "How much does it cost to organize a sports ?",
          "answer": "To organize a sports event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "Culinary ",
          "answer": "To organize a culinary event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "How much does it cost to organize a culinary ?",
          "answer": "To organize a culinary event, you can choose the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        },
        {
          "question": "Does D'SNAP provide pre-event consultation services?",
          "answer": "Yes, D'SNAP provides consultation services, please contact the contact listed. Our team will help design an event concept that suits your vision."
        },
        {
          "question": "Does D'SNAP provide event documentation services?",
          "answer": "Of course, we provide event documentation services such as professional photography and videography to ensure your important moments are well documented."
        },
        {
          "question": "Does D'SNAP offer graphic design services for events?",
          "answer": "Yes, we offer graphic design services to support promotional materials and event visuals, such as invitations, posters, backdrops, and other materials."
        },
        {
          "question": "Can D'SNAP handle virtual or hybrid events?",
          "answer": "Yes, D'SNAP has experience in managing virtual and hybrid events. We provide appropriate technology solutions, including live streaming, interactive platforms, and social media integration."
        },
        {
          "question": "Does D'SNAP have a network of event support vendors?",
          "answer": "Yes, we have a network of trusted vendors for various event needs, such as catering, decoration, audiovisual equipment, and others."
        },
        {
          "question": "How long does it take to prepare an event?",
          "answer": "The preparation time depends on the scale and complexity of the event. For small to medium events, it usually takes 2-4 weeks. While large events can take 1-3 months."
        },
        {
          "question": "Does D'SNAP offer ready-made event packages?",
          "answer": "Yes, we provide pre-designed event packages to make it easier for you, such as product launch packages, community parties, and music concerts. You can find the details on the reservation page."
        },
        {
          "question": "Can I customize an event package at D'SNAP?",
          "answer": "Of course! You can consult with our team to design an event package that suits your needs and budget."
        },
        {
          "question": "How does D'SNAP handle challenges or sudden changes during an event?",
          "answer": "We have an experienced and responsive team to handle any challenges or sudden changes with quick and effective solutions for the success of your event."
        },
        {
          "question": "What sets D'SNAP apart from other event organizers?",
          "answer": "Our strength lies in our creativity, dedication, and experience in managing various types of events. We always prioritize client satisfaction by providing innovative event solutions and results that exceed expectations."
        }
      ]
    };
    this.eventCosts = {
        indonesia: {
          "Community Celebration": "Untuk menyelenggarakan Community Celebration, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00.",
          "Product Launch": "Untuk menyelenggarakan Product Launch, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00.",
          "Corporate Conference": "Untuk menyelenggarakan Corporate Conference, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00.",
          "Musical Event": "Untuk menyelenggarakan Musical Event, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00.",
          "Sports Event": "Untuk menyelenggarakan Sports Event, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        english: {
          "Community Celebration": "To organize a Community Celebration, you can select the medium event option on the Reservation page, with prices starting from IDR 25,000,000.00.",
          "Product Launch": "To organize a Product Launch, you can select the Big Event option on the Reservation page, with prices starting from IDR 50,000,000.00.",
          "Corporate Conference": "To organize a Corporate Conference, you can select the Small Event option on the Reservation page, with prices starting from IDR 10,000,000.00.",
          "Musical Event": "To organize a Musical Event, you can select the Big Event option on the Reservation page, with prices starting from IDR 50,000,000.00.",
          "Sports Event": "To organize a Sports Event, you can select the Medium Event option on the Reservation page, with prices starting from IDR 25,000,000.00."
        }
      };
    this.language = "indonesia"; 
    this.questions = [];
    this.answers = [];
    this.tfidfMatrix = null;
    this._prepareData();
  }

  _prepareData() {
    this.questions = this.data[this.language].map(qa => qa.question);
    this.answers = this.data[this.language].map(qa => qa.answer);

    // Reset and rebuild the TF-IDF vectorizer
    this.vectorizer = new natural.TfIdf();
    this.questions.forEach((question, index) => {
      this.vectorizer.addDocument(question);
    });
  }

  setLanguage(lang) {
    if (this.data[lang]) {
      this.language = lang;
      this._prepareData();
    }
  }

  _getCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (norm1 * norm2) || 0;
  }

  getEventCost(eventName) {
    const normalizedEvent = Object.keys(this.eventCosts[this.language]).find(
      key => key.toLowerCase().includes(eventName.toLowerCase())
    );

    if (normalizedEvent) {
      return {
        response: this.eventCosts[this.language][normalizedEvent],
        eventFound: true
      };
    }

    return {
      response: this.language === 'indonesia' 
        ? "Maaf, informasi tentang acara tersebut tidak tersedia."
        : "Sorry, information about that event is not available.",
      eventFound: false
    };
  }

  async getResponse(userInput) {
    try {
      // Get TF-IDF vectors for the user input
      const userVector = [];
      this.vectorizer.tfidfs(userInput, (i, measure) => {
        userVector[i] = measure;
      });

      // Calculate similarities with all questions
      const similarities = this.questions.map((_, index) => {
        const questionVector = [];
        this.vectorizer.tfidfs(this.questions[index], (i, measure) => {
          questionVector[i] = measure;
        });
        return this._getCosineSimilarity(userVector, questionVector);
      });

      // Find the best match
      const bestMatchIndex = similarities.indexOf(Math.max(...similarities));
      
      // Check if the similarity is too low
      if (similarities[bestMatchIndex] < 0.1) {
        return {
          response: this.language === 'indonesia'
            ? "Maaf, saya tidak dapat memahami pertanyaan Anda. Mohon berikan pertanyaan yang spesifik sesuai opsi yang kami berikan...😊"
            : "Sorry, I am unable to understand your question. Please provide a specific question according to the options we have provided...😊"
        };
      }

      return {
        response: this.answers[bestMatchIndex]
      };
    } catch (error) {
      console.error('Error getting response:', error);
      throw error;
    }
  }
}

module.exports = ChatbotHandler;
