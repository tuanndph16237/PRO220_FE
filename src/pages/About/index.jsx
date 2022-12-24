import React from 'react';
import "./about.css"
const AboutPage = () => {
    return <div>
        <section class="about">
            <div class="content">
                <h3>GIỚI THIỆU</h3>
                <p>Dodoris là công ty cung cấp dịch vụ sửa chữa và bảo dưỡng xe.</p>
                <br />
                <p>Với 20 năm kinh nghiệm, chúng tôi luôn sẵn sàng đem lại trải nghiệm bảo dưỡng xe hiện đại, tiện lợi nhất cho khách hàng.</p>
                <p>Đội ngũ chuyên gia của chúng tôi sẽ chẩn đoán vấn đề thông qua các sự cố khách hành gặp phải khi lái xe, từ đó đưa 
                    ra giải pháp tiết kiệm và hiệu quả nhất về chi phí cũng như thời gian của quý khách.</p>
                <a href="#" class="btn">read more</a>

                <div class="image">
                <img src="https://storage.googleapis.com/vinfast-data-01/suachuachung_1656870130_1658394834.png" alt=""/>
                </div>

                <h3>Dấu chân toàn cầu</h3>
                <p>Dodoris đã có mặt tại hơn 20 quốc gia trên thế giới, đáp ứng được các yêu cầu khắt khe về kĩ thuật của thị trường quốc tế.</p>
                <p>Chúng tôi có kinh nghiệm bảo dưỡng xe từ bất cứ nguồn gốc nào (Mỹ, Đức, Ý, Hồng Công, Việt Nam,...). Quý
                    khách có thể yên tâm gửi gắm xe cho chúng tôi.
                </p>
                <div class="image">
                    <img src="../../../public/images/blue-world-map-continents-planet-globalization-communications-social-network-stock-vector-150025459.jpg" alt="" />
                </div>

            </div>

        </section>

    </div>;
    };

export default AboutPage;
