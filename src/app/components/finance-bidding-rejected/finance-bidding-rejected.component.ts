import { Component, OnInit, ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { InvoiceDetailsRejectedComponent } from './invoice-details-rejected/invoice-details-rejected.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FinanceBiddingRejectedServices } from './finance-bidding-rejected-service'
import { FinanceBiddingService } from '../../service/finance_bidding/finance-bidding.service';
import { FINANCIERDASHBOARDCONSTANTS } from '../../shared/constants/constants';

@Component({
  selector: 'app-finance-bidding-rejected',
  templateUrl: './finance-bidding-rejected.component.html',
  styleUrls: ['./finance-bidding-rejected.component.scss']
})
export class FinanceBiddingRejectedComponent implements OnInit {
  @Input() InvoiceDetailsRejectedComponent: InvoiceDetailsRejectedComponent;
  ELEMENT_DATA1: any[];
  constructor(public router: Router, public authenticationService: AuthenticationService,
    private modalService: BsModalService, private FinanceBiddingRejectedServices: FinanceBiddingRejectedServices, private FinanceBiddingService: FinanceBiddingService) { }

  dataSource;//data
  displayedColumns: string[] = [
    'BIDID',
    'Invoice Amount',
    'BIDing Amount',
    'offer Expires',
    'action'
  ]
  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;
  isOpen = '';
  bidpanelOpenState = false;
  id = ""
  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;
  dashboardTooltip = FINANCIERDASHBOARDCONSTANTS;
  @HostListener('window:resize', ['$event'])
  modalRef: BsModalRef;
  isHover: boolean = false;
  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }
    this.FinanceBiddingRejectedServices.getInvoiceDetails().subscribe(resp => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
    })
  }
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }
  public scrollRight(): void {
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: 'smooth',
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  isOpenHandle(isTrue) {
    this.isOpen = isTrue === 'inActive' ? 'active' : 'inActive';
  }
  navigateFinanceBidding() {
    this.router.navigateByUrl('/finance-bidding');
  }
  logout() {
    this.authenticationService.logout()
  }
  goHome() {
    this.router.navigateByUrl('/financier-dashboard');
  }
  navigateFinanceDetails(id, type) {
    this.router.navigateByUrl('/finance-bidding-rejected/' + type + '/' + id);
  }
}


