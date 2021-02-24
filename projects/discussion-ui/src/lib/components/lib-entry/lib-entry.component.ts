import { DiscussionService } from './../../services/discussion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/* tslint:disable */
import * as _ from 'lodash'
import { IdiscussionConfig } from '../../models/discussion-config.model';
import { ConfigService } from '../../services/config.service';
/* tslint:enable */
@Component({
  selector: 'lib-lib-entry',
  templateUrl: './lib-entry.component.html',
  styleUrls: ['./lib-entry.component.scss']
})
export class LibEntryComponent implements OnInit {

  data: IdiscussionConfig;

  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
    private configService: ConfigService,
    private location: Location
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      let config = localStorage.getItem(_.get(params, 'page'))
      debugger
      this.configService.setConfig(JSON.parse(config))

      this.data = this.configService.getConfig();
      this.discussionService.userName = _.get(this.data, 'userName');
      const rawCategories = _.get(this.data, 'categories');
      this.discussionService.forumIds = _.get(rawCategories, 'result');
      this.discussionService.initializeUserDetails(this.data.userName);
    });
  }

  goBack() {
    this.location.back();
  }

}
