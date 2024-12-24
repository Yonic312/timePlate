/**
Constructor
Do not call Function in Constructor.
*/
function MainView() {
    AView.call(this);
    
    this.cnt = sessionStorage.length + 1; // 세션의 길이를 가져와 add시 사용
    this.cntS = 0; // 그리드에서 선택한 글의 cnt 값
    this.column = 0; // 그리드에서 선택한 글의 column 값
    //this.searchKeyword = ''; S
}
afc.extendsClass(MainView, AView);

MainView.prototype.init = function(context, evtListener) {
    AView.prototype.init.call(this, context, evtListener);
    
    const time = new Date();
    const nowTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
    const searchKeyword = sessionStorage.getItem("searchKeyword");
    const searchOption = sessionStorage.getItem("select_list");
    
    //if(searchKeyword == null || searchKeyword == ''){
    if (!searchKeyword) {
        const allData = [];
        // 세션 forEach로 순환
        Object.keys(sessionStorage).forEach(key => {
            if (key !== "searchKeyword" && key !== "select_list") {
                const value = sessionStorage.getItem(key);
        
                // JSON 파싱
                const parsedValue = JSON.parse(value);
        
                allData.push(parsedValue);
            }
        });
        
        allData.sort((a, b) => a.cnt - b.cnt);
        allData.forEach(item => {
            const data = [
                item.cnt,
                item.title,
                item.text,
                item.name,
                item.time
            ];

            this.main_grid.addRow(data);
        });
        
    } else {
        const allData = [];
        const filteredData = [];
        
        // 세션 forEach로 순환
        Object.keys(sessionStorage).forEach(key => {
            if (key !== "searchKeyword" && key !== "select_list") {
                const value = sessionStorage.getItem(key);

                // JSON 파싱
                const parsedValue = JSON.parse(value);
                
                allData.push(parsedValue[searchOption]);
                
                // 검색 옵션이 ~인 value 값
                if ((parsedValue[searchOption].toString()).includes(searchKeyword)) { // .toString은 cnt가 문자가 아니라서 변환
                    filteredData.push(parsedValue);
                }
            }
        });
        
        filteredData.sort((a, b) => a.cnt - b.cnt);

        filteredData.forEach(item => {
            const data = [
                item.cnt,
                item.title,
                item.text,
                item.name,
                item.time
            ];

            this.main_grid.addRow(data);
        });
    }
};


MainView.prototype.onInitDone = function() {
    AView.prototype.onInitDone.call(this);
};

MainView.prototype.onActiveDone = function(isFirst) {
    AView.prototype.onActiveDone.call(this, isFirst);
};


MainView.prototype.click_add_bntX = function(comp, info, e) {
    this.addBox.$ele.css("display", "none");
};

MainView.prototype.click_add_cancel = function(comp, info, e) {
    this.addBox.$ele.css("display", "none");
};

MainView.prototype.click_write_button = function(comp, info, e) {    
    this.addBox.$ele.css("display", "block");
    
	// add박스 추가마다 초기화
    this.add_text.setText('');
    this.add_title.setText('');
    this.add_user.setText('');
};

MainView.prototype.click_add_ok = function(comp, info, e) {    
    const time = new Date();
    const nowTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
    
    let dataList = {
        cnt: this.cnt,
        title: this.add_title.getText(),
        text: this.add_text.getText(),
        name: this.add_user.getText(),
        time: nowTime
    };
    
    sessionStorage.setItem(`dataList${this.cnt}`, JSON.stringify(dataList));
    this.addBox.$ele.css("display", "none");
    
    // 그리드에 추가
    var data = [this.cnt, this.add_title.getText(), this.add_text.getText(), this.add_user.getText(), nowTime];
    this.main_grid.addRow(data);
    
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
    }
    
    this.cnt++;
};

MainView.prototype.main_grid_select = function(comp, info, e) {
    var index = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);
    
    // 누른 열의 cnt 값
    this.cntS = this.main_grid.getCellText(index, 0);
    this.column = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);
    
    this.edit_title.setText(this.main_grid.getCellText(index, 1));
    this.edit_text.setText(this.main_grid.getCellText(index, 2));
    this.edit_user.setText(this.main_grid.getCellText(index, 3));
    this.editBox.$ele.css("display", "block");
};

MainView.prototype.click_edit_bntX = function(comp, info, e) {    
    this.editBox.$ele.css("display", "none");
};

MainView.prototype.click_edit_delete = function(comp, info, e) {
    // 배열 제거
    this.main_grid.removeRowSet(this.column);
    
    // 세션 제거
    Object.keys(sessionStorage).forEach(key => {
        const value = sessionStorage.getItem(key);
        const parsedValue = JSON.parse(value);
        
        if (parsedValue.cnt == this.cntS) {
            sessionStorage.removeItem(key);
        }
    });
    
    this.editBox.$ele.css("display", "none");
};

MainView.prototype.click_edit_ok = function(comp, info, e) {
    const time = new Date();
    const nowTime = "! " + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
    
    // 세션에서 데이터를 가져온다
    Object.keys(sessionStorage).forEach(key => {
        const value = sessionStorage.getItem(key);
        
        // 세션에 저장된 값이 JSOn 문자열일 경우 파싱한다
        const parsedValue = JSON.parse(value);
        
        // 배열에서 특정 cnt 값을 찾아서 수정한다
        if (parsedValue.cnt == this.cntS) {
            parsedValue.title = this.edit_title.getText();
            parsedValue.text = this.edit_text.getText();
            parsedValue.name = this.edit_user.getText();
            parsedValue.time = nowTime;
            
            sessionStorage.setItem(key, JSON.stringify(parsedValue));
        }
    });
    
    location.reload(); // 캐시된 페이지를 로딩
};

MainView.prototype.click_seartch_button = function(comp, info, e) {
    if (this.search.getText() == '') {
        sessionStorage.setItem("select_list", this.select_list.getSelectedItemValue());
        sessionStorage.setItem("searchKeyword", this.search.getText());
    } else {
        sessionStorage.setItem("select_list", this.select_list.getSelectedItemValue());
        sessionStorage.setItem("searchKeyword", this.search.getText());
    }
    
    location.reload(); // 캐시된 페이지를 로딩
};
