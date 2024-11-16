import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  showScrollTop = false;
  isMenuOpen = false;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.setActiveNavLink();
    this.showScrollTop = window.scrollY > 300;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.matches('.nav-links a')) {
      event.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        const sectionId = href.replace('#', '');
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          this.updateActiveNavLink(target);
        }
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private setActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach((section) => {
      const element = section as HTMLElement;
      const sectionTop = element.offsetTop;
      const sectionHeight = element.clientHeight;

      if (window.scrollY >= (sectionTop - 150)) {
        currentSection = element.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href')?.includes(currentSection)) {
        link.classList.add('active');
      }
    });
  }

  private updateActiveNavLink(clickedLink: HTMLElement) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
  }

  openVirtualTour() {
    window.open('URL_DO_SEU_TOUR_VIRTUAL', '_blank');
  }

  scheduleClass() {
    const message = "Olá! Gostaria de agendar uma aula experimental na Academia Equilibrium.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
