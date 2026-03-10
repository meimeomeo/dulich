import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Star, MapPin, Camera, Utensils, Landmark, Heart, Moon, Sun, Music, MessageCircle, X } from "lucide-react";

interface Destination {
  name: string;
  img: string;
  desc: string;
  mapUrl: string;
}

interface Cuisine {
  name: string;
  img: string;
  desc: string;
  tag?: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}

const destinations: Destination[] = [
  { 
    name: "Hồ Hoàn Kiếm", 
    img: "https://disantrangan.vn/wp-content/uploads/2021/05/ho_hoan_kiem_02.jpg", 
    desc: "Trái tim của Thủ đô, nơi gắn liền với truyền thuyết trả gươm báu cho Rùa Thần. Hồ Hoàn Kiếm không chỉ là một danh lam thắng cảnh mà còn là biểu tượng văn hóa, lịch sử của người dân Hà Nội. Quanh hồ là các di tích như đền Ngọc Sơn, cầu Thê Húc, tháp Bút, đài Nghiên.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hồ+Hoàn+Kiếm"
  },
  { 
    name: "Văn Miếu", 
    img: "https://img1.kienthucvui.vn/uploads/2019/08/15/cong-van-mieu-quoc-tu-giam-co-xua_103832628.jpg", 
    desc: "Trường đại học đầu tiên của Việt Nam, biểu tượng của tinh thần hiếu học. Văn Miếu - Quốc Tử Giám được xây dựng từ năm 1070, là nơi thờ Khổng Tử và các bậc hiền triết. Khu di tích nổi bật với Khuê Văn Các và 82 bia Tiến sĩ vinh danh những người đỗ đạt.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Văn+Miếu+Quốc+Tử+Giám"
  },
  { 
    name: "Phố Cổ", 
    img: "https://static.vinwonders.com/production/pho-co-ha-noi-1.jpg", 
    desc: "Khu vực 36 phố phường sầm uất với những ngôi nhà ống cổ kính và làng nghề truyền thống. Mỗi con phố ở đây thường bắt đầu bằng chữ 'Hàng', gắn liền với một mặt hàng kinh doanh đặc trưng. Phố Cổ là nơi lưu giữ linh hồn của Thăng Long xưa.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Phố+Cổ+Hà+Nội"
  },
  { 
    name: "Lăng Bác", 
    img: "https://img1.kienthucvui.vn/uploads/2019/07/19/hinh-anh-lang-bac-ho-o-ha-noi_112812656.jpg", 
    desc: "Nơi an nghỉ cuối cùng của Chủ tịch Hồ Chí Minh vĩ đại. Lăng được xây dựng tại Quảng trường Ba Đình lịch sử, nơi Bác đã đọc bản Tuyên ngôn Độc lập. Đây là địa điểm thiêng liêng mà bất kỳ người con Việt Nam nào cũng muốn ghé thăm một lần.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lăng+Chủ+tịch+Hồ+Chí+Minh"
  },
  { 
    name: "Hồ Tây", 
    img: "https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-ho-tay-dep-1-1536x1083.jpg", 
    desc: "Hồ nước tự nhiên lớn nhất Hà Nội, mang vẻ đẹp lãng mạn và yên bình. Hồ Tây là điểm đến lý tưởng để ngắm hoàng hôn, thưởng thức bánh tôm hay dạo quanh các ngôi chùa cổ như chùa Trấn Quốc, phủ Tây Hồ. Không gian xanh mát ở đây mang lại cảm giác thư thái giữa lòng thành phố.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hồ+Tây+Hà+Nội"
  },
  { 
    name: "Hoàng Thành Thăng Long", 
    img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/5/7/1189286/Anh-Hoang-Thanh-Than-11.jpg", 
    desc: "Di sản Văn hóa Thế giới với bề dày lịch sử hơn 1300 năm. Đây là trung tâm chính trị, văn hóa quan trọng của Việt Nam qua nhiều triều đại. Khu di tích bao gồm các công trình kiến trúc đồ sộ và hàng triệu hiện vật khảo cổ quý giá minh chứng cho sự phát triển của kinh đô Thăng Long.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Hoàng+Thành+Thăng+Long"
  },
  {
    name: "Chùa Trấn Quốc",
    img: "https://vcdn1-dulich.vnecdn.net/2021/04/22/Chua-Tran-Quoc-1-1619084224.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=W9v6Y-Y_Y_Y_Y_Y_Y_Y_Y_A",
    desc: "Ngôi chùa cổ nhất Hà Nội với hơn 1500 năm tuổi, nằm trên một hòn đảo nhỏ phía Đông Hồ Tây. Chùa Trấn Quốc nổi tiếng với kiến trúc uy nghiêm, tháp Bảo Tháp lục độ đài sen và cây bồ đề cổ thụ do Tổng thống Ấn Độ tặng.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chùa+Trấn+Quốc"
  },
  {
    name: "Nhà hát lớn Hà Nội",
    img: "https://static.vinwonders.com/production/nha-hat-lon-ha-noi-1.jpg",
    desc: "Công trình kiến trúc tiêu biểu mang đậm phong cách Pháp tại trung tâm Thủ đô. Nhà hát Lớn là nơi diễn ra các chương trình nghệ thuật hàn lâm, sự kiện văn hóa quan trọng, là biểu tượng của sự sang trọng và tinh tế trong nghệ thuật.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Nhà+hát+Lớn+Hà+Nội"
  },
  {
    name: "Cầu Long Biên",
    img: "https://media.vov.vn/sites/default/files/styles/large/public/2022-02/cau_long_bien_1.jpg",
    desc: "Chứng nhân lịch sử nối liền hai bờ sông Hồng, được xây dựng từ thời Pháp thuộc. Cầu Long Biên mang vẻ đẹp hoài cổ, trầm mặc, là địa điểm yêu thích để ngắm nhìn nhịp sống bình dị của người dân và tận hưởng gió sông mát lành.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cầu+Long+Biên"
  }
];

const cuisines: Cuisine[] = [
  { name: "Phở Bò", img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43", desc: "Món ăn quốc hồn quốc túy với nước dùng thanh ngọt từ xương bò ninh kỹ trong nhiều giờ. Bánh phở mềm dai kết hợp cùng thịt bò tái lăn hoặc chín, thêm chút hành lá và quẩy giòn tạo nên hương vị khó quên của buổi sáng Hà Nội.", tag: "Tinh hoa" },
  { name: "Bún Chả", img: "https://statics.vinpearl.com/bun-cha-ha-noi-3_1688011791.jpg", desc: "Thịt nướng thơm lừng trên than hồng ăn kèm nước chấm chua ngọt và bún tươi. Từng miếng chả viên và chả miếng được tẩm ướp đậm đà, nướng cháy cạnh, hòa quyện cùng đu đủ xanh giòn sần sật và rau sống thanh mát.", tag: "Truyền thống" },
  { name: "Cà phê trứng", img: "https://statics.vinpearl.com/cafe-trung-ha-noi-so-1_1679647446.jpg", desc: "Vị béo ngậy của kem trứng đánh bông mịn màng hòa quyện cùng hương vị cà phê đắng đặc trưng. Đây là thức uống sáng tạo độc đáo của người Hà Nội, mang lại cảm giác ấm áp và ngọt ngào như một món tráng miệng tinh tế.", tag: "Đặc sản" },
  { name: "Bún đậu mắm tôm", img: "https://img5.thuthuatphanmem.vn/uploads/2021/11/24/cach-lam-bun-dau-mam-tom_101907385.jpg", desc: "Món ăn dân dã nhưng đầy sức hút với đậu hũ chiên vàng, thịt chân giò luộc, chả cốm và mắm tôm pha chanh ớt đánh sủi bọt. Một trải nghiệm ẩm thực đường phố không thể bỏ qua khi đến Hà Nội.", tag: "Dân dã" },
  { name: "Chả cá Lã Vọng", img: "https://static.vinwonders.com/production/cha-ca-la-vong-ha-noi-4.jpg", desc: "Món ăn tinh tế hơn 100 năm tuổi của Hà Thành. Cá lăng được tẩm ướp gia vị bí truyền, nướng vàng rồi chiên nóng cùng hành hoa, thì là. Thưởng thức kèm bún, lạc rang và mắm tôm đậm đà, tạo nên hương vị di sản khó quên.", tag: "Di sản" },
  { name: "Bánh mì Hà Nội", img: "https://images.squarespace-cdn.com/content/v1/5cb9ef147eb88c5caefa30b3/1615985478065-1SFJ74MJ7MJHQJFXLFCF/Vietnamese+Baguette+Her+86m2+by+Thuy+Dao+3.JPG", desc: "Sự kết hợp hoàn hảo giữa vỏ bánh giòn rụm và nhân pate, xá xíu, dưa góp đậm đà. Là món ăn đường phố biểu tượng, gắn liền với nhịp sống hối hả của Thủ đô, mang đến hương vị khó phai cho mọi thực khách.", tag: "Đường phố" },
  { name: "Cốm làng Vòng", img: "https://media.cooky.vn/images/blog-2016/com-xanh-lang-vong-dac-san-ha-noi-duoc-lam-ra-the-nao-va-nhung-mon-ngon-voi-com-mua-thu-6.png", desc: "Thức quà tinh túy của mùa thu Hà Nội, mang hương vị lúa non dịu nhẹ và màu xanh ngọc bích đẹp mắt. Cốm được gói trong lá sen thơm, ăn kèm chuối tiêu chín cuốc, là biểu tượng của sự thanh tao và nhẹ nhàng trong văn hóa ẩm thực Thủ đô.", tag: "Quà thu" },
  { name: "Bún Thang", img: "https://tse4.mm.bing.net/th/id/OIP.CKYrKi8AXqjKH-oK-aJ9zQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", desc: "Món ăn cầu kỳ và tinh tế nhất của người Hà Nội, ví như tác phẩm nghệ thuật đa sắc màu. Nước dùng trong vắt, ngọt thanh từ xương gà và tôm khô. Bát bún hội tụ đủ lườn gà xé, giò lụa, trứng tráng mỏng và nấm hương. Một chút mắm tôm và tinh dầu cà cuống tạo nên hương vị quý phái đặc trưng.", tag: "Cầu kỳ" }
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "NGƯỜI YÊU HÀ NỘI",
    location: "Đà Nẵng",
    rating: 5,
    quote: "Hà Nội mùa thu đẹp đến nao lòng, không khí thật trong lành và bình yên. Tôi đã có những phút giây thư giãn tuyệt vời tại Hồ Gươm.",
    avatar: "😊"
  },
  {
    id: 2,
    name: "CÔ HẰNG",
    location: "Hải Phòng",
    rating: 5,
    quote: "Phở Hà Nội thực sự là tinh hoa ẩm thực, hương vị thanh tao khó cưỡng! Tôi đã thử nhiều nơi nhưng vị ở đây vẫn là đặc biệt nhất.",
    avatar: "😇"
  },
  {
    id: 3,
    name: "XUÂN HIẾU",
    location: "Hà Nội",
    rating: 5,
    quote: "Dạo quanh phố cổ vào buổi tối là trải nghiệm tuyệt vời nhất tôi từng có! Những con phố nhỏ rêu phong luôn mang lại cảm giác hoài niệm.",
    avatar: "😋"
  },
  {
    id: 4,
    name: "THẾ KIÊN",
    location: "TP. HCM",
    rating: 5,
    quote: "Kiến trúc Văn Miếu thật uy nghiêm và mang đậm giá trị lịch sử dân tộc. Một điểm đến không thể bỏ qua cho những ai yêu văn hóa.",
    avatar: "🌟"
  }
];

const Counter = ({ target, suffix = "", duration = 2000, decimals = 0 }: { target: number; suffix?: string; duration?: number; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return <h3 ref={elementRef} className="font-serif">{count.toFixed(decimals).replace('.', ',')}{suffix}</h3>;
};

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="text-center mb-12 md:mb-16 relative pt-10">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative z-10 inline-block"
    >
      <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#c3b091] mb-6">
        {title} {highlight && <span className="font-bold text-[#c3b091]">{highlight}</span>}
      </h2>
      <div className="w-24 h-0.5 bg-[#c3b091] mx-auto opacity-50"></div>
    </motion.div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState("light");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<{ text: string; type: "bot" | "user" }[]>([
    { text: "Xin chào! Tôi là trợ lý ảo Hà Nội Guide. Tôi có thể giúp gì cho chuyến hành trình khám phá Thủ đô của bạn?", type: "bot" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMsgs]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const askBot = (question: string) => {
    setChatMsgs(prev => [...prev, { text: question, type: "user" }]);
    setTimeout(() => {
      let response = "Tôi là trợ lý ảo Hà Nội Guide. Bạn muốn biết thêm về " + question + " phải không?";
      if (question.includes("Thời tiết")) response = "Hôm nay Hà Nội 24°C, nắng nhẹ, rất thích hợp để dạo quanh Hồ Gươm và thưởng thức kem Tràng Tiền!";
      if (question.includes("Ăn gì")) response = "Phố Cổ nổi tiếng với Phở bò Lý Quốc Sư, Bún chả Hàng Quạt và Cà phê trứng Giảng. Bạn nên thử nhé!";
      if (question.includes("Địa điểm")) response = "Bạn không nên bỏ lỡ Hồ Gươm, Văn Miếu và dạo quanh 36 phố phường bằng xích lô để cảm nhận trọn vẹn Thủ đô!";
      setChatMsgs(prev => [...prev, { text: response, type: "bot" }]);
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <>
      <header>
        <a href="#home" className="logo flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center shadow-lg">
            <Landmark className="text-white" size={24} />
          </div>
          <span>Du lịch Hà Nội</span>
        </a>
        <nav>
          <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#intro">Giới thiệu</a></li>
            <li><a href="#destinations">Điểm đến</a></li>
            <li><a href="#cuisine">Ẩm thực</a></li>
            <li><a href="#news">Tin tức</a></li>
          </ul>
        </nav>
        <div className="header-btns">
          <a href="#contact-section" className="btn-book">Đặt Chuyến Đi</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      <div className="marquee">
        <div className="marquee-content">
          <span>HÀ NỘI HÔM NAY: 24°C - Trời nắng nhẹ - Độ ẩm 65% - Rất phù hợp cho các hoạt động ngoài trời - Đừng quên chuẩn bị một chiếc áo khoác mỏng cho buổi tối quanh hồ... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HÀ NỘI HÔM NAY: 24°C - Trời nắng nhẹ - Độ ẩm 65% - Rất phù hợp cho các hoạt động ngoài trời - Đừng quên chuẩn bị một chiếc áo khoác mỏng cho buổi tối quanh hồ...</span>
          <span>HÀ NỘI HÔM NAY: 24°C - Trời nắng nhẹ - Độ ẩm 65% - Rất phù hợp cho các hoạt động ngoài trời - Đừng quên chuẩn bị một chiếc áo khoác mỏng cho buổi tối quanh hồ... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HÀ NỘI HÔM NAY: 24°C - Trời nắng nhẹ - Độ ẩm 65% - Rất phù hợp cho các hoạt động ngoài trời - Đừng quên chuẩn bị một chiếc áo khoác mỏng cho buổi tối quanh hồ...</span>
        </div>
      </div>

      <section className="hero" id="home">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src="https://cdn.pixabay.com/video/2023/10/20/185806-876609914_large.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-sub">Du lịch Hà Nội</h2>
          <h1 className="hero-main">TRÁI TIM VIỆT NAM</h1>
        </div>
      </section>

      <section id="intro" className="fade-in">
        <SectionHeader title="Vẻ Đẹp Ngàn Năm" />
        <div className="intro-content">
          <p className="text-lg leading-relaxed mb-12">Hà Nội — thủ đô của Việt Nam — là một thành phố ngàn tuổi với bề dày lịch sử và văn hóa sâu sắc. Nằm bên dòng sông Hồng đỏ nặng phù sa, thành phố là sự hòa quyện tuyệt vời giữa kiến trúc cổ kính của 36 phố phường và nhịp sống hiện đại đầy năng động. Từ những mái ngói rêu phong của Phố cổ, tiếng rao hàng rong buổi sớm, đến ánh đèn lung linh phản chiếu trên Hồ Tây mỗi chiều tà — Hà Nội luôn khiến lòng người thổn thức và nhớ mãi.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "50px", textAlign: "left" }}>
            <div className="info-frame">
              <h4 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>📍 Vị trí địa lý</h4>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>Nằm ở trung tâm đồng bằng sông Hồng, Hà Nội tiếp giáp với các tỉnh Thái Nguyên, Vĩnh Phúc ở phía Bắc; Hà Nam, Hòa Bình ở phía Nam; Bắc Giang, Bắc Ninh, Hưng Yên ở phía Đông và Phú Thọ ở phía Tây. Vị trí chiến lược này giúp Hà Nội trở thành đầu mối giao thông quan trọng của cả nước.</p>
            </div>
            <div className="info-frame">
              <h4 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>☀️ Khí hậu</h4>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>Hà Nội mang đặc trưng của khí hậu nhiệt đới gió mùa với 4 mùa rõ rệt. Mùa xuân ấm áp với mưa phùn, mùa hè nóng ẩm mưa nhiều, mùa thu mát mẻ với bầu trời xanh ngắt và mùa đông se lạnh khô ráo. Mỗi mùa đều mang đến cho Thủ đô một vẻ đẹp riêng biệt và đầy quyến rũ.</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-item">
              <Counter target={1010} />
              <p>Năm lịch sử</p>
            </div>
            <div className="stat-item">
              <Counter target={8.5} suffix="M" decimals={1} />
              <p>Dân số</p>
            </div>
            <div className="stat-item">
              <Counter target={3359} />
              <p>Diện tích (km²)</p>
            </div>
            <div className="stat-item">
              <Counter target={36} />
              <p>Phố phường</p>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="fade-in">
        <SectionHeader title="Điểm Đến" highlight="Tuyệt Vời" />
        <div className="dest-grid grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {destinations.map((d, i) => (
            <div key={i} className="flip-card" onClick={() => setSelectedDest(d)}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={d.img} alt={d.name} referrerPolicy="no-referrer" />
                  <div className="overlay">{d.name}</div>
                </div>
                <div className="flip-card-back">
                  <h3>{d.name}</h3>
                  <p>{d.desc.substring(0, 130)}...</p>
                  <button className="btn-detail">Xem chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cuisine" className="fade-in">
        <SectionHeader title="Tinh Hoa" highlight="Ẩm Thực" />
        <div className="cuisine-grid-new flex flex-col gap-12 max-w-6xl mx-auto px-4">
          {cuisines.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-brand-bg-secondary p-6 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-brand-accent/5`}
            >
              <div className="w-full md:w-1/2 h-[350px] overflow-hidden rounded-[30px]">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center space-y-10 px-8`}>
                <span className="inline-block px-8 py-2.5 bg-[#c3b091] text-white text-sm font-bold uppercase tracking-[0.2em] rounded-lg shadow-sm">{c.tag}</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#c3b091]">{c.name}</h3>
                <p className="text-[#555555] leading-relaxed text-lg text-center mx-auto max-w-lg">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="news" className="fade-in">
        <SectionHeader title="Tin Tức" highlight="Mới Nhất" />
        <div className="news-slider">
          {[
            { title: "Mùa thu Hà Nội - Thời điểm đẹp nhất năm", img: "https://media.mia.vn/uploads/blog-du-lich/tan-huong-mua-thu-ha-noi-dep-rung-dong-long-nguoi-02-1650256279.jpg", desc: "Khám phá những góc phố rợp lá vàng và hương hoa sữa nồng nàn đặc trưng của mùa thu Thủ đô. Đây là lúc Hà Nội dịu dàng nhất, mang lại cảm giác bình yên khó tả." },
            { title: "Văn hóa cà phê vỉa hè tại Thủ đô", img: "https://media.kinhtetieudung.vn/thumb_x600x/images/2025/04/14/33-1744628230-9335546a-f9dc-4361-b7a0-5cd54fca89ee-9d7dce5d.jpg", desc: "Trải nghiệm nhịp sống chậm rãi bên ly cà phê trứng nổi tiếng tại các con ngõ nhỏ Phố Cổ. Cà phê không chỉ là thức uống mà còn là một phần tâm hồn của người Hà Nội." },
            { title: "Hà Nội về đêm: Sôi động và lung linh", img: "https://img5.thuthuatphanmem.vn/uploads/2021/12/06/hinh-anh-ha-noi-nhon-nhip-ve-dem_013057858.jpg", desc: "Những địa điểm không thể bỏ qua khi thành phố lên đèn, từ Tạ Hiện náo nhiệt đến phố đi bộ Hồ Gươm thanh bình. Một diện mạo hoàn toàn khác của Thủ đô." },
            { title: "Lễ hội văn hóa dân gian tại Hồ Gươm", img: "https://vov2.vov.vn/sites/default/files/styles/large/public/2021-01/2bcb9ab6caf023ae7ae1.jpg", desc: "Hàng loạt hoạt động nghệ thuật truyền thống được tái hiện sống động quanh khu vực phố đi bộ, thu hút hàng ngàn du khách tham gia trải nghiệm." },
            { title: "Khai mạc triển lãm thư pháp tại Văn Miếu", img: "https://nhanmyhocduong.vn/storage/photos/13/D8.jpg", desc: "Không gian văn hóa đậm chất sĩ tử xưa với những nét chữ phượng múa rồng bay, tôn vinh truyền thống hiếu học ngàn đời của dân tộc." },
            { title: "Tour đi bộ khám phá 36 phố phường", img: "https://static.vinwonders.com/production/ha-noi-36-pho-phuong-3.jpg", desc: "Hành trình len lỏi qua những con ngõ nhỏ, tìm hiểu về lịch sử các làng nghề truyền thống và thưởng thức ẩm thực đường phố trứ danh." },
            { title: "Khám phá làng gốm Bát Tràng", img: "https://static.vinwonders.com/production/lang-gom-bat-trang-1.jpg", desc: "Trải nghiệm tự tay nhào nặn những sản phẩm gốm độc đáo và tìm hiểu về làng nghề truyền thống lâu đời bên bờ sông Hồng." },
            { title: "Vẻ đẹp cổ kính của làng cổ Đường Lâm", img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-12/lang_co_duong_lam.jpg", desc: "Hành trình ngược thời gian về với không gian làng quê Bắc Bộ xưa với cổng làng, cây đa, bến nước và những ngôi nhà đá ong cổ." },
            { title: "Thưởng thức ẩm thực đêm tại chợ Đồng Xuân", img: "https://static.vinwonders.com/production/cho-dong-xuan-ha-noi-1.jpg", desc: "Thiên đường ẩm thực với vô vàn món ngon dân dã, từ bún ốc, cháo sườn đến các loại chè truyền thống hấp dẫn." },
            { title: "Lễ hội hoa đào Nhật Tân rực rỡ sắc xuân", img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/vuon_dao_nhat_tan.jpg", desc: "Hòa mình vào không khí tết rộn ràng tại làng hoa nổi tiếng nhất Hà Nội, nơi cung cấp những gốc đào đẹp nhất cho mọi nhà." }
          ].map((n, i) => (
            <div key={i} className="news-card">
              <img src={n.img} alt={n.title} referrerPolicy="no-referrer" />
              <div className="news-body">
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="fade-in" style={{ padding: "80px 0", overflow: "hidden", background: "var(--bg-secondary)" }}>
        <SectionHeader title="Cảm nhận" highlight="du khách" />
        <div className="marquee-container pause-on-hover" style={{ position: "relative", display: "flex", overflow: "hidden", padding: "20px 0" }}>
          <div className="marquee-content animate-marquee-testimonials" style={{ display: "flex", gap: "30px", whiteSpace: "nowrap" }}>
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ flexShrink: 0, width: "60px", height: "60px", borderRadius: "50%", background: "var(--bisque)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                  {t.avatar}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontSize: "1.1rem", color: "var(--brown-dark)", margin: 0 }}>{t.name}</h4>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={12} fill={starIdx < t.rating ? "var(--khaki)" : "none"} stroke="var(--khaki)" />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.8rem", color: "var(--khaki)" }}>
                    <MapPin size={12} /> {t.location}
                  </div>
                  <p style={{ fontSize: "0.95rem", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", inset: "0 auto 0 0", width: "100px", background: "linear-gradient(to right, var(--bg-secondary), transparent)", zIndex: 10 }}></div>
          <div style={{ position: "absolute", inset: "0 0 0 auto", width: "100px", background: "linear-gradient(to left, var(--bg-secondary), transparent)", zIndex: 10 }}></div>
        </div>
      </section>

      <section id="contact-section" className="contact-section fade-in">
        <div className="contact-form-container">
          <h3 className="mb-6">Nhắn cho chúng mình</h3>
          <div className="w-20 h-0.5 bg-[#c3b091] opacity-40 mb-10"></div>
          <p>Form này là demo UI. Khi bấm gửi, bạn sẽ nhận một thông báo xác nhận ngay trên trang.</p>
          <form onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label>Tên</label>
              <input type="text" placeholder="Ví dụ: Minh Anh" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="minhanh@email.com" required />
            </div>
            <div className="form-group">
              <label>Lời nhắn</label>
              <textarea rows={4} placeholder="Bạn muốn đi Hà Nội mùa nào, thích ăn gì, thích đi đâu?" required></textarea>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button type="submit" className="btn-submit">Gửi tin nhắn</button>
              {submitSuccess && <span style={{ color: "#2e7d32", fontWeight: 600 }}>✓ Đã gửi thành công</span>}
            </div>
          </form>
        </div>
        <div className="quick-tips">
          <h3 className="flex items-center gap-3 mb-6"><Camera className="text-brand-accent" /> Quick tips</h3>
          <div className="w-20 h-0.5 bg-[#c3b091] opacity-40 mb-10"></div>
          <ul className="tips-list mt-6">
            <li className="flex items-start gap-3 mb-4">
              <div className="mt-1"><Star size={16} className="text-brand-accent" fill="currentColor" /></div>
              <span>Đi sớm để tránh đông tại các điểm di tích.</span>
            </li>
            <li className="flex items-start gap-3 mb-4">
              <div className="mt-1"><Sun size={16} className="text-brand-accent" fill="currentColor" /></div>
              <span>Mang áo khoác mỏng buổi tối quanh hồ.</span>
            </li>
            <li className="flex items-start gap-3 mb-4">
              <div className="mt-1"><Utensils size={16} className="text-brand-accent" fill="currentColor" /></div>
              <span>Thử combo "phở sáng - cafe trứng trưa - bún chả tối".</span>
            </li>
          </ul>
          <div className="contact-info-footer">
            <p>Email demo: hello@hanoireverie.vn</p>
            <p>Hotline demo: 1900-1010</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div>
          <h4>Du lịch Hà Nội</h4>
          <p>Khám phá vẻ đẹp ngàn năm văn hiến của Thủ đô yêu dấu. Chúng tôi cung cấp các tour du lịch trải nghiệm văn hóa sâu sắc và chân thực nhất cho mọi hành trình.</p>
          <div className="social-icons">
            <a href="#" title="Facebook"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" style={{ width: "24px", height: "24px" }} referrerPolicy="no-referrer" /></a>
            <a href="#" title="Instagram"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="IG" style={{ width: "24px", height: "24px" }} referrerPolicy="no-referrer" /></a>
            <a href="#" title="YouTube"><img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YT" style={{ width: "24px", height: "24px" }} referrerPolicy="no-referrer" /></a>
            <a href="#" title="Zalo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="ZN" style={{ width: "24px", height: "24px" }} referrerPolicy="no-referrer" /></a>
          </div>
        </div>
        <div>
          <h4>Chính sách</h4>
          <ul>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Hướng dẫn du lịch</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ & Bản đồ</h4>
          <p>📍 36 Phố Cổ, Hoàn Kiếm, Hà Nội</p>
          <p>📞 1900 1234</p>
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119175.437048937!2d105.7030741870624!3d21.022738703858927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bdad66195%3A0xecdabc060d87d4d1!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2svn!4v1709999999999!5m2!1svi!2svn" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </footer>

      <div className="copyright-bar">
        <p>@2026 Du lịch Hà Nội. Tất cả các quyền đã được đăng ký.</p>
      </div>

      {selectedDest && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "25px", left: "40px", zIndex: 10 }}>
              <h2 style={{ fontSize: "2.2rem", color: "var(--khaki)", margin: 0 }}>{selectedDest.name}</h2>
            </div>
            <div style={{ position: "absolute", top: "25px", right: "80px", zIndex: 10 }}>
              <a 
                href={selectedDest.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-bold text-brand-text-secondary hover:text-brand-accent transition-colors flex items-center gap-1"
              >
                <MapPin size={16} /> Xem địa chỉ
              </a>
            </div>
            <span className="close-modal" onClick={() => setSelectedDest(null)} style={{ top: "15px", right: "25px" }}>&times;</span>
            <div className="modal-body" style={{ paddingTop: "80px" }}>
              <img src={selectedDest.img} style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "20px", marginBottom: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }} referrerPolicy="no-referrer" />
              <p style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "1.05rem" }}>{selectedDest.desc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="audio-btn" onClick={toggleAudio}>{isPlaying ? "⏸️" : "🎵"}</div>
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2024/05/28/audio_eab9a7a9f2.mp3" type="audio/mpeg" />
      </audio>

      <div className="chatbot">
        <div className="chat-btn" onClick={() => setIsChatOpen(!isChatOpen)}>💬</div>
        {isChatOpen && (
          <div className="chat-window" style={{ display: "flex" }}>
            <div className="chat-header">
              <span>Hanoi Guide AI</span>
              <span style={{ cursor: "pointer", fontSize: "1.8rem" }} onClick={() => setIsChatOpen(false)}>&times;</span>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
              {chatMsgs.map((m, i) => (
                <div key={i} className={`chat-msg msg-${m.type}`}>{m.text}</div>
              ))}
            </div>
            <div className="chat-suggestions">
              <button className="suggestion-btn" onClick={() => askBot("Thời tiết Hà Nội hôm nay?")}>Thời tiết?</button>
              <button className="suggestion-btn" onClick={() => askBot("Ăn gì ở Phố Cổ?")}>Ăn gì ở Phố Cổ?</button>
              <button className="suggestion-btn" onClick={() => askBot("Địa điểm tham quan?")}>Địa điểm?</button>
            </div>
            <div className="chat-footer">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && chatInput.trim()) {
                    askBot(chatInput);
                    setChatInput("");
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
