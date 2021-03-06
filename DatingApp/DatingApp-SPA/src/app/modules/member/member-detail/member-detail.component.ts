import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @ViewChild('memberTabs')
  memberTabs: TabsetComponent;

  user: User;
  userPhotoUrl: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      console.log(this.user);

      if (this.user.photoUrl == null) {
        this.userPhotoUrl = '../../../../assets/user-photo.png';
      } else {
        this.userPhotoUrl = this.user.photoUrl;
      }
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
