<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'sveltestrap';
  import Logo from '../../assets/img/Logo.png';
  import IcoEsc from '../../assets/img/icon/esc-80.png';
  import { push, location } from 'svelte-spa-router';
  import jQ from 'jquery';
  import { onMount } from 'svelte';
  import { IconArrowBack, IconArrowNarrowDown, IconArrowNarrowUp } from '@tabler/icons-svelte';

  // STICKY TOP
  onMount(() => {
    jQ(window).scroll(function () {
      if (jQ(this).scrollTop() > 300) {
        jQ('.navbar').addClass('shadow-sm').css('top', '0px');
      } else {
        jQ('.navbar').removeClass('shadow-sm').css('top', '-100px');
      }
    });
  });

  // DROPDOWN MENU
  onMount(() => {
    const dropdown = jQ('.dropdown');
    const dropdownToggle = jQ('.dropdown-toggle');
    const dropdownMenu = jQ('.dropdown-menu');
    const showClass = 'show';

    if (window.matchMedia('(min-width: 992px)').matches) {
      dropdown.hover(
        function () {
          const $this = jQ(this);
          $this.addClass(showClass);
          $this.find(dropdownToggle).attr('aria-expanded', 'true');
          $this.find(dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = jQ(this);
          $this.removeClass(showClass);
          $this.find(dropdownToggle).attr('aria-expanded', 'false');
          $this.find(dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      dropdown.off('mouseenter mouseleave');
    }
  });

  // DARK MODE
  let isDarkMode = false;

  const handleIconDark = () => {
    const icon = document.querySelector('#toggle-icon i');
    icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
  };

  const handleIconLight = () => {
    const icon = document.querySelector('#toggle-icon i');
    icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
  };

  const handleSwitchChange = (event) => {
    let isChecked = event.target.checked;
    isDarkMode = isChecked;

    if (isChecked) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      handleIconDark();
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      handleIconLight();
    }
  };

  onMount(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode)) {
      isDarkMode = true;
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      handleIconDark();
    } else {
      isDarkMode = false;
      document.documentElement.setAttribute('data-bs-theme', 'light');
      handleIconLight();
    }
  });

  onMount(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        const prefersDarkMode = mediaQuery.matches;
        isDarkMode = prefersDarkMode;
        document.documentElement.setAttribute('data-bs-theme', prefersDarkMode ? 'dark' : 'light');
        prefersDarkMode ? handleIconDark() : handleIconLight();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  });

  // SEARCH MODAL
  let openSearch = false;
  let size: any;
  const toggle = () => {
    size = 'sm';
    openSearch = !openSearch;
  };
</script>

<div>
  <Navbar class="py-3 py-lg-0 px-ms-2 px-md-5 px-lg-3" container expand="lg" sticky="top">
    <NavbarBrand on:click={() => push('/')} type="button" class="d-flex align-items-center">
      <img src={Logo} alt="BPKPD" class="logo" width="45" height="45" />
      <div class="d-flex align-items-center">
        <span class="d-none d-lg-block">BPKPD Kabupaten Pohuwato</span>
        <span class="d-none d-md-block d-lg-none">BPKPD Kab. Pohuwato</span>
        <span class="d-sm-none">B P K P D</span>
      </div>
    </NavbarBrand>
    <div class="d-flex d-lg-none align-items-center justify-content-between">
      <button on:click={toggle} type="button" class="btn text-primary" data-bs-toggle="modal" data-bs-target="#searchModal">
        <i class="fa fa-search" />
      </button>
      <div class="toggle_darkmode-hp">
        <label for="darkmode-hp" class="switch-darkmode">
          <span id="toggle-icon">
            <i class="bi bi-sun-fill opacity-75" />
          </span>
          <input type="checkbox" role="switch" id="darkmode-hp" checked={isDarkMode} on:change={handleSwitchChange} />
        </label>
      </div>
      <button
        class="navbar-toggler collapsed d-flex d-lg-none flex-column-reverse justify-content-around"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="toggler-icon top-bar" />
        <span class="toggler-icon middle-bar" />
        <span class="toggler-icon bottom-bar" />
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <Nav class="ms-auto" navbar>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Profil</DropdownToggle>
          <DropdownMenu>
            <DropdownItem class={$location == '/visimisi' ? 'active' : ''} on:click={() => push('/visimisi')}>
              Visi dan Misi</DropdownItem>
            <DropdownItem class={$location == '/tupoksi' ? 'active' : ''} on:click={() => push('/tupoksi')}>
              Tugas dan Fungsi</DropdownItem>
            <DropdownItem class={$location == '/struktur' ? 'active' : ''} on:click={() => push('/struktur')}>
              Struktur Organisasi</DropdownItem>
            <DropdownItem divider />
            <DropdownItem class={$location == '/profile' ? 'active' : ''} on:click={() => push('/profile')}
              >Profil Pejabat</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Informasi</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Perbup/Perkada</DropdownItem>
            <DropdownItem>Pertanggungjawaban</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Aplikasi</DropdownItem>
            <DropdownItem>Kegiatan</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink href="/">Pelayanan</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Transfomasi</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/bestguy/sveltestrap">Kontak</NavLink>
        </NavItem>
        <NavItem class="button-pc d-none d-lg-block ms-2">
          <button on:click={toggle} type="button" class="btn bg-transparent text-primary">
            <i class="fa fa-search" />
          </button>
        </NavItem>
        <NavItem class="label-pc d-none d-lg-block ms-3">
          <input
            class="input-darkmode d-none d-lg-block"
            type="checkbox"
            role="switch"
            id="darkmode-pc"
            checked={isDarkMode}
            on:change={handleSwitchChange} />
          <label class="label-darkmode d-none d-lg-block" for="darkmode-pc">
            <i class="bi bi-sun-fill icon-darkmode sun opacity-75" />
            <i class="bi bi-moon-stars-fill icon-darkmode moon opacity-75" />
          </label>
        </NavItem>
      </Nav>
    </div>
  </Navbar>
  <Modal isOpen={openSearch} {toggle}>
    <ModalHeader class="search-header w-100">
      <div class="search-box">
        <i class="fa fa-search icon-search" />
        <input class="input-search" type="text" name="" placeholder="Pencarian" />
      </div>
    </ModalHeader>
    <ModalBody class="search-body">
      <span class="no-search">Tidak ada pencarian terbaru</span>
    </ModalBody>
    <ModalFooter class="search-footer">
      <span>
        <IconArrowBack class="me-1" />
        Pilih
      </span>
      <span>
        <IconArrowNarrowDown />
        <IconArrowNarrowUp />
        Navigasi
      </span>
      <span>
        <img src={IcoEsc} height={40} alt="ico esc" />
      </span>
    </ModalFooter>
  </Modal>
</div>
