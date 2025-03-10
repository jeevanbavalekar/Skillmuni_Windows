import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, NgZone, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-zone-articles',
  templateUrl: './zone-articles.component.html',
  styleUrls: ['./zone-articles.component.css']
})
export class ZoneArticlesComponent implements OnInit, AfterViewInit, OnDestroy {

  
  title: string = '';
  subtitle: string = '';
  articles: any[] = [];
  completedAssessments: Set<string> = new Set();
  touchStartY: number = 0;
  touchEndY: number = 0;

  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;
  currentIndex: number = 0;
  showPopup: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ✅ Ensure body scrolling is disabled
    document.body.style.overflow = 'hidden';

    // ✅ Scroll to the top when the component initializes
    window.scrollTo(0, 0);

    const state = this.location.getState() as { articles: any[], title: string, subtitle: string };
    if (state && state.articles) {
        this.articles = state.articles;
        this.title = state.title;
        this.subtitle = state.subtitle;
    } else {
        console.warn('No state found. Please navigate via the proper channel.');
    }

    this.loadCompletedAssessments();
}

ngAfterViewInit() {
  this.scrollToCard(0);
  this.observeScrollItems();

  // Add touch event listeners for swipe detection on mobile
  const container = this.contentContainer.nativeElement;
  container.addEventListener("touchstart", this.onTouchStart.bind(this));
  container.addEventListener("touchend", this.onTouchEnd.bind(this));
}


  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) { // ✅ Scroll Down
      this.handleScrollDown();
    } else if (event.deltaY < 0) { // ✅ Scroll Up
      this.handleScrollUp();
    }
  }

  handleScrollUp() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCard(this.currentIndex);
    }
  }
  handleScrollDown() {
    const nextIndex = this.currentIndex + 1;
  
    if (nextIndex < this.articles.length) {
      // 🔹 If "Register" is visible, allow scrolling without restrictions
      if (this.title === 'International Zone' || this.title === 'Entrepreneur Zone') {
        this.currentIndex = nextIndex;
        this.scrollToCard(this.currentIndex);
        return;
      }
  
      // 🔹 Otherwise, apply normal restrictions
      if (!this.canAccessArticle(nextIndex)) {
        if (this.hasTryQuizButton(nextIndex)) {
          console.log("🚫 Cannot access article, showing popup");
          this.triggerPopup();
        }
        return;
      }
  
      console.log("✅ Moving to next article");
      this.currentIndex = nextIndex;
      this.scrollToCard(this.currentIndex);
    }
  }
  

  onBackClick() {
    this.location.back();
  }

  navigateToRegister() {
    if (this.title === 'Entrepreneur Zone') {
      this.router.navigate(['/entrepreneur-zone/article/register']);
    } else if (this.title === 'International Zone') {
      this.router.navigate(['/international-zone/article/register']);
    }
  }

  loadCompletedAssessments() {
    this.completedAssessments.clear();
    let lastCompletedIndex = -1;

    this.articles.forEach((article, index) => {
      const storedData = sessionStorage.getItem(`assessment_${article.brief_code}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.submitted) {
          this.completedAssessments.add(article.brief_code);
          lastCompletedIndex = index;
        }
      }
    });

    this.currentIndex = lastCompletedIndex + 1;
  }

  canAccessArticle(index: number): boolean {
    if (index >= this.articles.length) {
      return false;
    }
  
    const article = this.articles[index];
  
    // 🔹 If "Register" button is visible, allow all articles to be scrollable
    if (this.title === 'International Zone' || this.title === 'Entrepreneur Zone') {
      return true;
    }
  
    // 🔹 Otherwise, restrict access based on completed assessments
    return this.completedAssessments.has(article.brief_code) || index === this.currentIndex;
  }
  

  hasTryQuizButton(index: number): boolean {
    if (index >= this.articles.length) return false;
    const article = this.articles[index];
    return !this.completedAssessments.has(article.brief_code); // ✅ If not completed, "Try the Quiz!" is visible
  }

  triggerPopup() {
    this.ngZone.run(() => {
      const sessionKeys = Object.keys(sessionStorage);
      const assessmentKey = sessionKeys.find(key => key.startsWith('assessment_'));
      
      let shouldShowPopup = false; // Default behavior: don't show popup
  
      if (assessmentKey) {
        const storedData = sessionStorage.getItem(assessmentKey);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData)
          if (!parsedData.submitted) {
            console.log("⚠️ Assessment found, NOT submitted → Showing Popup");
            shouldShowPopup = true;
          } else {
            console.log("✅ Assessment found and submitted, skipping popup.");
          }
        }
      } else {
        console.log("🚨 No assessment data found → Showing Popup.");
        shouldShowPopup = true;
      }
  
      // Show popup if conditions are met
      if (shouldShowPopup) {
        this.showPopup = true;
        this.cdr.detectChanges();
        console.log("🟢 Popup is now visible!");
  
        setTimeout(() => {
          this.ngZone.run(() => {
            this.showPopup = false;
            this.cdr.detectChanges();
            console.log("⏳ Hiding Popup after timeout");
          });
        }, 3000);
      }
    });
  }
  
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }
  
  onTouchEnd(event: TouchEvent) {
    this.touchEndY = event.changedTouches[0].clientY;
  
    // Determine swipe direction
    if (this.touchStartY - this.touchEndY > 50) {
      // **Swipe Up Detected**
      this.handleScrollDown();
    } else if (this.touchEndY - this.touchStartY > 50) {
      // **Swipe Down Detected**
      this.handleScrollUp();
    }
  }
  
  

  scrollToCard(index: number) {
    const container = this.contentContainer.nativeElement;
    const targetElement = container.children[index];
    if (targetElement) {
      container.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
    }
  }

  navigateToTest(article: any) {
    if (!article?.brief_code) {
      console.error('Error: Missing article or brief_code', article);
      return;
    }
    this.router.navigate(['/assessment'], {
      queryParams: {
        brfcode: article.brief_code,
        title: this.title,
        subtitle: this.subtitle
      }
    });
  }

  viewPreviousAssessment(article: any) {
    if (!article?.brief_code) {
      console.error('Error: Missing article or brief_code', article);
      return;
    }

    const storedData = sessionStorage.getItem(`assessment_${article.brief_code}`);

    if (storedData) {
      this.router.navigate(['/assessment'], {
        queryParams: {
          brfcode: article.brief_code,
          title: this.title,
          subtitle: this.subtitle
        }
      });
    } else {
      console.warn('No previous assessment found, redirecting to new quiz');
      this.navigateToTest(article);
    }
  }

  observeScrollItems() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.2 });

    const scrollItems = document.querySelectorAll(".scroll-item");
    scrollItems.forEach((item) => observer.observe(item));
  }
}
