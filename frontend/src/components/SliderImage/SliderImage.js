import banner from '../images/banner.jpg';
import bannerDesktop from '../images/bannerDesktop.jpg'
import styles from './SliderImage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function SliderImage() {

    return (
        <div >
            <div className={styles.bannerMobile}>
                <Swiper className={styles.banner}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination

                >

                    <SwiperSlide >
                        <img src={banner} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={banner} alt="" />
                    </SwiperSlide>
                </Swiper>

            </div>
            <div className={styles.bannerDesktop}>
                <Swiper className={styles.banner}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination
                >

                    <SwiperSlide >
                        <img src={bannerDesktop} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={bannerDesktop} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>

    );
}