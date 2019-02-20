import { Selector, t } from 'testcafe';

const selectWithAttr = (selector, value) => Selector(selector).withAttribute('test-id', value);

export default class UserListPage {
  btnLogout = selectWithAttr('button', 'btn-logout');
  btnDel = selectWithAttr('button', 'btn-del');
  thListColAct = selectWithAttr('th', 'btn-logout');
  trListRowUser = selectWithAttr('tr', 'list-row-user');

  async logout() {
    await t.click(this.btnLogout);
  }

  async checkRowRender(payload) {
    const rows = await this.trListRowUser;
    await t.expect(rows.count).eql(payload.data.length);
  }
}
