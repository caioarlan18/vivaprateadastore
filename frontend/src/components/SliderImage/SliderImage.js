
import styles from './SliderImage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1mobile from '../images/banner 1 mobile downscale.png';
import banner2mobile from '../images/banner 2 mobile downscale.png';
import banner3mobile from '../images/banner 3 mobile.png';
import banner4mobile from '../images/banner 4 mobile downscale.png';
import banner5mobile from '../images/banner 5 mobile downscale.png';
import banner1desktop from '../images/banner 1 desktop.PNG';
import banner2desktop from '../images/banner 2 desktop.PNG';
import banner3desktop from '../images/banner 3 desktop.PNG';
import banner4desktop from '../images/banner 4 desktop.PNG';
import banner5desktop from '../images/banner 5 desktop.PNG';
export function SliderImage() {

    return (
        <div >
            <div className={styles.bannerMobile}>
                <Swiper className={styles.banner}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination
                    autoplay
                >

                    <SwiperSlide >
                        <img src={banner1mobile} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner2mobile} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner3mobile} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner4mobile} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner5mobile} alt="" />
                    </SwiperSlide>
                </Swiper>

            </div>
            <div className={styles.bannerDesktop}>
                <Swiper className={styles.banner}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination
                    autoplay
                >

                    <SwiperSlide >
                        <img src={banner1desktop} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner2desktop} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner3desktop} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner4desktop} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner5desktop} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>

    );
}