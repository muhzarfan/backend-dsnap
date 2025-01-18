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
            "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan perayaan komunitas ?",
          "answer": "Untuk menyelenggarakan perayaan komunitas, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        {
          "question": "Peluncuran Produk",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan peluncuran produk ?",
          "answer": "Untuk menyelenggarakan peluncuran produk, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00."
        },
        {
          "question": "Konferensi",
          "answer": "Untuk menyelenggarakan konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan konferensi ?",
          "answer": "Untuk menyelenggarakan konferensi konferensi, Anda dapat memilih opsi acara kecil di halaman Reservasi, dengan harga mulai dari IDR 10,000,000.00."
        },
        {
          "question": "Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Konser Musik",
          "answer": "Untuk menyelenggarakan acara konser musik, Anda dapat memilih opsi acara besar di halaman Reservasi, dengan harga mulai dari IDR 50,000,000.00."
        },
        {
          "question": "Acara Olahraga",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Olahraga ?",
          "answer": "Untuk menyelenggarakan acara olahraga, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        {
          "question": "Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
        },
        {
          "question": "Berapa biaya untuk mengadakan Acara Kuliner",
          "answer": "Untuk menyelenggarakan acara kuliner, Anda dapat memilih opsi acara medium di halaman Reservasi, dengan harga mulai dari IDR 25,000,000.00."
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
