import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private modalRef: BsModalRef;
  private lojas_da_rede_social:object = {};
  private imagens_logo:object = {
    "FACEBOOK":"/assets/dashboard.fw.png",
    "TWITTER":"/assets/dashboard.fw.png",
    "INSTAGRAM":"/assets/dashboard.fw.png",
    "GOOGLE MEU NEGÓCIO":"/assets/dashboard.fw.png",
    "PINTEREST":"/assets/dashboard.fw.png",
    "LINKEDIN":"/assets/dashboard.fw.png",
    "YOUTUBE":"/assets/dashboard.fw.png",
    "WHATSAPP":"/assets/dashboard.fw.png",
    "GOOGLE_ANALYTICS":"/assets/dashboard.fw.png",
  }
  private logas_por_redes_sociais:object[] = [
    { rede_social:"FACEBOOK",
      channel_key:"facebook",
      imagem:"/assets/logo-facebook.fw.png",
      background:"#39589B",
      lojas:[]},
    { rede_social:"TWITTER",
      channel_key:"twitter",
      imagem:"/assets/logo-twitter.fw.png",
      background:"#50ABF1",
      lojas:[]},
    { rede_social:"INSTAGRAM",
      channel_key:"instagram",
      imagem:"/assets/logo-instagran.fw.png",
      background:"#C4368B",
      lojas:[]},
    { rede_social:"GOOGLE MEU NEGÓCIO",
      channel_key:"google_meu_negocio",
      imagem:"/assets/logo-negocio.fw.png",
      background:"#70AAFB",
      lojas:[]},
    { rede_social:"PINTEREST",
      channel_key:"pinterest",
      imagem:"/assets/logo-pinterest.fw.png",
      background:"#CF0000",
      lojas:[]},
    { rede_social:"LINKEDIN",
      channel_key:"linkedin",
      imagem:"/assets/logo-linkedin.fw.png",
      background:"#3279AA",
      lojas:[]},
    { rede_social:"YOUTUBE",
      channel_key:"youtube",
      imagem:"/assets/logo-youtube.fw.png",
      background:"#EE1216",
      lojas:[]},
    { rede_social:"WHATSHAP",
      channel_key:"whatshap",
      imagem:"/assets/logo-whatshap.fw.png",
      background:"#55F473",
      lojas:[]},
    { rede_social:"GOOGLE ANALYTICS",
      channel_key:"google_analytics",
      imagem:"/assets/logo-analytics.fw.png",
      background:"#F27901",
      lojas:[]}
  ]

  constructor(private modalService: BsModalService,
              private dashboardService:DashboardService) { }

  selecionarLojas(lojas_da_rede_social:object):void{
    this.lojas_da_rede_social = lojas_da_rede_social
  }

  haLojasSelecionadas(lojas:object):boolean{
    for(let loja in lojas){
      if(lojas[loja]['ativo'] == true)
        return true
    }
    return false
  }

  salvarLojas(){
    this.dashboardService.gravarConfiguracoes(this.logas_por_redes_sociais);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  carregarLojas():void{
    this.dashboardService.lojas().subscribe((lojas) => {
      this.estruturarLojasPorRedesSociais(lojas)
    });
  }

  estruturarLojasPorRedesSociais(lojas:object):void{
    for(let chave_rede_social in this.logas_por_redes_sociais)
      for(let chave_loja in lojas){
        var rede_social = this.logas_por_redes_sociais[chave_rede_social]
        var loja = lojas[chave_loja]
        if(rede_social['channel_key'] == loja['channel_key']){
          loja['ativo'] = false;
          rede_social['lojas'].push(loja)
        }
      }
  }

  ngOnInit() {
    var dados = this.dashboardService.retornarConfiguracoes()
    if(dados != null)
      this.logas_por_redes_sociais = dados;
    else
      this.carregarLojas()
  }

}
