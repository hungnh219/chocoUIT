// import anhCuaHang from "assets/anh-cuahang.jpg";
import anhCuaHang from "assets/about-chocouit.png";
import { Link } from "react-router-dom";
import path from "ultils/path";

function About() {
  return (
    <div className="w-main mt-6 flex flex-col items-center">
      <h3 className="text-main inline-block mb-4 py-2 font-semibold text-5xl text-center shadow-[0px_4px_0px_0px_rgba(236,193,61,1)]">
        Giới thiệu
      </h3>
      <div className="p-4 border flex gap-8 bg-main rounded">
        <img
          src={anhCuaHang}
          alt="anh-cua-hang"
          className="w-[40%] rounded-lg"
        />
        <div className="w-[60%] flex flex-col items-center text-white">
          <h3 className="text-center  font-semibold text-xl py-2">
            Chào mừng bạn đến với{" "}
            <span className="font-bold text-2xl">ChocoUIT</span>
          </h3>
          <p className="indent-4 mb-2 text-justify">
          🍫 Chocolate Bomb – Ngọt ngào tan chảy, ấm áp từng khoảnh khắc! ☕ <br/>
          Chocolate Bomb là viên sô-cô-la đặc biệt được thiết kế với lớp
          vỏ sô-cô-la mịn màng bao bọc bên trong là marshmallow xốp mềm
          và bột cacao thơm lừng. Khi được thả vào cốc sữa ấm, viên chocolate
          từ từ tan chảy, tạo nên một thức uống sô-cô-la nóng béo ngậy, ngọt ngào,
          mang lại cảm giác ấm áp khó quên giữa tiết trời se lạnh. <br/>
          👉 Một trải nghiệm tuyệt vời để thưởng thức cùng gia đình, bạn bè hoặc tự thưởng cho chính mình vào những ngày đông giá rét. <br/>
          👉 Không chỉ là thức uống, Chocolate Bomb còn là món quà tinh tế và ý nghĩa cho mọi dịp đặc biệt, đặc biệt là mùa Giáng Sinh sắp tới! 🎄✨<br/>
          </p>
          <p className="indent-4 my-2 text-justify">
          ChocoUIT – Nơi gửi trao những ngọt ngào! ❤️
          </p>
            <button className="w-[98%] text-center rounded py-1 text-gray-100 font-semibold bg-[#f3c63f] hover:text-white hover:-translate-y-1 hover:scale-105 duration-300">
                <Link to={`/${path.INTRODUCE}`} className="px-[224px]">
                    Xem thêm
                </Link>
            </button>
        </div>
      </div>
    </div>
  );
}

export default About;
