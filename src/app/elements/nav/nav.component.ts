/**
 * 主页导航条
 *
 *
 * @date     2017-11-07
 * @author   liuzheng <liuzheng712@gmail.com>
 */
import {Component, OnInit} from '@angular/core';
import {AppService, HttpService, LocalStorageService, LogService} from '../../app.service';
import {CleftbarComponent} from '../../ControlPage/cleftbar/cleftbar.component';
import {ControlComponent, NavList} from '../../ControlPage/control/control.component';
import {DataStore, i18n} from '../../globals';
import * as jQuery from 'jquery/dist/jquery.min.js';
// import * as layer from 'layui-layer/src/layer.js';
declare let layer: any;

@Component({
  selector: 'app-element-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class ElementNavComponent implements OnInit {
  DataStore = DataStore;

  static Hide() {
    jQuery('app-element-nav').hide();
  }

  constructor(private _appService: AppService,
              private _http: HttpService,
              private _logger: LogService,
              private _localStorage: LocalStorageService) {
    this._logger.log('nav.ts:NavComponent');
    this.getnav();
  }

  ngOnInit() {
  }

  click(event) {
    this._logger.debug('nav.ts:NavComponent,click', event);
    switch (event) {
      case 'ReloadLeftbar': {
        CleftbarComponent.Reload();
        break;
      }

      case 'HideLeft': {
        CleftbarComponent.Hide();
        break;
      }
      case 'ShowLeft': {
        CleftbarComponent.Show();
        break;
      }
      case 'Copy': {
        // this._appService.copy();
        break;
      }
      case'Disconnect': {
        switch (NavList.List[NavList.Active].type) {
          case 'ssh': {
            ControlComponent.TerminalDisconnect(NavList.Active);
            break;
          }
          case 'rdp': {
            ControlComponent.RdpDisconnect(NavList.Active);
            break;
          }
          default: {
            // statements;
            break;
          }
        }
        break;
      }
      case'DisconnectAll': {
        ControlComponent.DisconnectAll();
        break;
      }
      case 'Website': {
        window.open('http://www.jumpserver.org');
        break;
      }
      case 'Document': {
        window.open('http://docs.jumpserver.org/');
        break;
      }
      case 'Support': {
        window.open('https://market.aliyun.com/products/53690006/cmgj026011.html?spm=5176.730005.0.0.cY2io1');
        break;
      }
      case 'EnterLicense': {
        this.EnterLicense();
        break;
      }
      case 'English': {
        this.English();
        break;
      }
      case 'Chinese': {
        this.Language('cn');
        break;
      }
      default: {
        break;
      }
    }

  }

  EnterLicense() {
    layer.prompt({
      formType: 2,
      maxlength: 500,
      title: 'Please Input Code',
      scrollbar: false,
      area: ['400px', '300px'],
      moveOut: true,
      moveType: 1
    }, function (value, index) {
      DataStore.socket.emit('key', value);
      // layer.msg(value); //得到value
      layer.close(index);

    });
  }

  getnav() {
    this._logger.log('getnav');
    // this._http.get('/api/nav')
    //   .map(res => res.json())
    //   .subscribe(response => {
    //     DataStore.Nav = response;
    //   });
    DataStore.Nav = [{
      'id': 'File',
      'name': 'Server',
      'children': [
        // {
        //   'id': 'NewConnection',
        //   'href': '',
        //   'name': 'New connection',
        //   'disable': true
        // },
        // {
        //   'id': 'Connect',
        //   'click': 'Connect',
        //   'name': 'Connect',
        //   'disable': true
        // },
        {
          'id': 'Disconnect',
          'click': 'Disconnect',
          'name': 'Disconnect'
        },
        {
          'id': 'DisconnectAll',
          'click': 'DisconnectAll',
          'name': 'Disconnect all'
        },
        // {
        //   'id': 'Duplicate',
        //   'href': '',
        //   'name': 'Duplicate',
        //   'disable': true
        // },
        // {
        //   'id': 'Upload',
        //   'href': '',
        //   'name': 'Upload',
        //   'disable': true
        // },
        // {
        //   'id': 'Download',
        //   'href': '',
        //   'name': 'Download',
        //   'disable': true
        // },
        // {
        //   'id': ' Search',
        //   'href': '',
        //   'name': 'Search',
        //   'disable': true
        // },
        // {
        //   'id': 'Reload',
        //   'click': 'ReloadLeftbar',
        //   'name': 'Reload'
        // }
      ]
    }, {
      'id': 'View',
      'name': 'View',
      'children': [
        {
          'id': 'HideLeftManager',
          'click': 'HideLeft',
          'name': 'Hide left manager'
        },
        {
          'id': 'SplitVertical',
          'href': '',
          'name': 'Split vertical',
          'disable': true
        },
        {
          'id': 'CommandBar',
          'href': '',
          'name': 'Command bar',
          'disable': true
        },
        {
          'id': 'ShareSession',
          'href': '',
          'name': 'Share session (read/write)',
          'disable': true
        },
        {
          'id': 'Language',
          'href': '',
          'name': 'Language',
          'disable': true
        }]
    }, {
      'id': 'Help',
      'name': 'Help',
      'children': [
        // {
        //   'id': 'EnterLicense',
        //   'click': 'EnterLicense',
        //   'name': 'Enter License'
        // },
        {
          'id': 'Website',
          'click': 'Website',
          'name': 'Website'
        },
        {
          'id': 'Document',
          'click': 'Document',
          'name': 'Document'
        },
        {
          'id': 'Support',
          'click': 'Support',
          'name': 'Support'
        }]
    }, {
      'id': 'Language',
      'name': 'Language',
      'children': [
        {
          'id': 'English',
          'click': 'English',
          'name': 'English'
        },
        {
          'id': 'Chinese',
          'click': 'Chinese',
          'name': '中文'
        }
      ]
    }
    ];
  }

  Connect() {
    layer.prompt({
      formType: 2,
      maxlength: 500,
      title: 'Please Input Code',
      scrollbar: false,
      area: ['400px', '300px'],
      moveOut: true,
      moveType: 1
    }, function (value, index) {
      DataStore.socket.emit('key', value);
      // layer.msg(value); //得到value
      layer.close(index);

    });
  }

  English() {
    this._localStorage.delete('lang');
    i18n.clear();
    location.reload();
  }

  Language(lan: string) {
    this._http.get('/luna/i18n/' + lan + '.json').subscribe(
      data => {
        this._localStorage.set('lang', JSON.stringify(data));
      }
    );
    const l = this._localStorage.get('lang');
    if (l) {
      const data = JSON.parse(l);
      Object.keys(data).forEach((k, _) => {
        i18n.set(k, data[k]);
      });
    }
    location.reload();
  }
}
