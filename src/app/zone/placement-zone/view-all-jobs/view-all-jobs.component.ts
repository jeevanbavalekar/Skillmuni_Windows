import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-view-all-jobs',
  templateUrl: './view-all-jobs.component.html',
  styleUrls: ['./view-all-jobs.component.css']
})
export class ViewAllJobsComponent implements OnInit {
  title: string = "view-all-jobs";
  tabs = ['Available Jobs', 'Applied Jobs'];
  selectedTab = 0;
  isMobile: boolean = false;
  showMobileJobDetails: boolean = false;

  selectTab(index: number) {
    this.selectedTab = index;
  }

  constructor(private location: Location) {
    this.checkScreenSize();
  }

  onBackClick() {
    this.location.back();
  }

  jobs: Job[] = [
    {
      id: 1,
      title: '2D Concept Artist - Character',
      companyName: 'GlobalStep',
      companyLogo: 'assets/placement-zone-images/company-logos/globalstep.png',
      location: 'Pune, Maharashtra, India',
      keySkills: ['Numerical Reasoning', 'Verbal Reasoning', 'Logical Reasoning'],
      timePosted: '2 hours ago',
      description: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultrices augue sagittis amet sapien elit. Et donec ultricies dolor mauris massa cras ultrices. Neque mattis varius posuere pellentesque curabitur. Tellus cras elementum cursus non nulla pulvinar neque egestas sit. Diam a tellus ac lacinia mollis est nibh hac. Egestas nisi integer sagittis orci et. Scelerisque maecenas diam eget ullamcorper risus pharetra duis dui libero.'
    },
    {
      id: 2,
      title: 'Microsoft Intune Application Lead',
      companyName: 'Accenture',
      companyLogo: 'assets/placement-zone-images/company-logos/accenture.png',
      location: 'Pune, Maharashtra, India',
      keySkills: ['Numerical Reasoning', 'Verbal Reasoning', 'Logical Reasoning'],
      timePosted: '1 day ago',
      description: 'Lorem ipsum dolor sit amet consectetur. Tincidunt ultrices augue sagittis amet sapien elit. Et donec ultricies dolor mauris massa cras ultrices. Neque mattis varius posuere pellentesque curabitur.'
    }
  ];

  selectedJob: Job | null = null;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    // Select first job by default
    if (this.jobs.length > 0) {
      this.selectedJob = this.jobs[0];
    }

    // Check if mobile on init
    this.checkScreenSize();
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
    if (this.isMobile) {
      this.showMobileJobDetails = true;
      document.body.classList.add("mobile-overlay-active");
    }
  }

  closeMobileJobDetails(): void {
    this.showMobileJobDetails = false;
    document.body.classList.remove("mobile-overlay-active");
  }
}