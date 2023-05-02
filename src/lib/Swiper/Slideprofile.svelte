<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
  import 'swiper/css/bundle';
  import { Swiper, SwiperSlide } from 'swiper/react';

  let profiles = [];
  let isError = '';
  const getProfile = async () => {
    try {
      const { data } = await axios(`https://6444172b90738aa7c07eda32.mockapi.io/api/bkd/profile`);
      profiles = data;
    } catch (error) {
      isError = error;
    }
  };

  onMount(async () => {
    await getProfile();
  });
</script>

<div>
  <div class="container-fluid py-lg-5 py-3 wow animate__fadeInUpBig" data-wow-delay="0.1s">
    <div class="container">
      <div class="section-title">
        <h5 class="position-relative d-inline-block text-primary text-uppercase">Profil Pejabat</h5>
      </div>
      {#if profiles.length > 0}
        <Swiper
          class="home-profile wow animate__zoomIn"
          data-wow-delay="0.9s"
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}>
          <div class="swiper-wrapper">
            {#each profiles as profile}
              <SwiperSlide key={profile.id} class="profile-slide">
                <img src={profile.avatar} alt={profile.avatar} />
                <div class="detail-profile">
                  <h3 class="nama-profile">{profile.name}</h3>
                  <div class="jabatan-profile">
                    <span>{profile.job}</span>
                  </div>
                </div>
                <div class="social-profile">
                  <ul class="sosial_icon-profile">
                    <li>
                      <a href={profile.wa} target="_blank">
                        <i class="bi bi-whatsapp" />
                      </a>
                    </li>
                    <li>
                      <a href={profile.wa} target="_blank">
                        <i class="bi bi-facebook" />
                      </a>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            {/each}
          </div>
          <div class="swiper-pagination" />
        </Swiper>
      {:else if isError}
        <p class="text-bg-danger fs-1">{isError}</p>
      {:else}
        <div>Tidak ada data</div>
      {/if}
    </div>
  </div>
</div>
