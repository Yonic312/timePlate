/**
Constructor
Do not call Function in Constructor.
*/
function MainView() {
    AView.call(this);
        // 세션에서 cnt 값을 가져오고, 없으면 1로 초기화
        this.cnt = parseInt(sessionStorage.getItem("cnt")) || 1; 
        this.cntS = 0; // 그리드에서 선택한 글의 cnt 값
        this.column = 0; // 그리드에서 선택한 글의 column 값
}
afc.extendsClass(MainView, AView);

MainView.prototype.init = function(context, evtListener) { // 컴포넌트 초기화
    AView.prototype.init.call(this, context, evtListener);
    
    
};


MainView.prototype.onInitDone = function() { // 컴포넌트 초기화 완료 후
    AView.prototype.onInitDone.call(this);

	reloadGrid(this);
};

MainView.prototype.onActiveDone = function(isFirst) { // 컴포넌트 활성화 완료 후
    AView.prototype.onActiveDone.call(this, isFirst);
};

MainView.prototype.click_write_button = function(comp, info, e) {    
    var wnd = new AWindow('add');
	wnd.openCenter('Source/Views/addBox.lay', null, 1000,860);
	
	wnd.setResultCallback((result, data) => {
	  if(data){
		  data.cnt = this.cnt++;
		  sessionStorage.setItem(`dataList${this.cnt}`, JSON.stringify(data));
		  sessionStorage.setItem("cnt", this.cnt);
	  }
	  reloadGrid(this);
  	});
	
  
};



MainView.prototype.main_grid_select = function(comp, info, e) {
	var wnd = new AWindow('edit');
	wnd.openCenter('Source/Views/editBox.lay', null, 1000, 860);
	
	//
	var index = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);

	// 누른 열의 cnt 값
	this.cntS = this.main_grid.getCellText(index, 0);
	this.column = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);

	this.main_grid.getCellText(index, 1);
	this.main_grid.getCellText(index, 2);
	this.main_grid.getCellText(index, 3);
	
	// 열렸다
	wnd.setData({title: this.main_grid.getCellText(index, 1), user: this.main_grid.getCellText(index, 2), text: this.main_grid.getCellText(index, 3)});
	
	wnd.setResultCallback((result, data) => {
	  console.log('!!! : ');
	  console.log(data);
	  
		if(data == 'delete'){
			// 배열 제거
			this.main_grid.removeRowSet(this.column);
			let parsedValue;

			// 세션 제거
			Object.keys(sessionStorage).forEach(key => {
				const value = sessionStorage.getItem(key);
				
				try {
					parsedValue = JSON.parse(value);
				} catch(e){
					parsedValue = value;
				}
				

				if (parsedValue.cnt == this.cntS) {
					sessionStorage.removeItem(key);
				}
			});
		}else if(data != 'delete'){
			console.log('update1');
			
			const time = new Date();
			const nowTime = "! " + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();

			// 세션에서 데이터를 가져온다
			Object.keys(sessionStorage).forEach(key => {
				const value = sessionStorage.getItem(key);
				console.log('value : ' + value);

				// 세션에 저장된 값이 빈 문자열이 아니면
				if (value && value.trim() !== '') {
					try {
						// JSON 파싱
						const parsedValue = JSON.parse(value);
						updateSessionData(parsedValue, key, this);
					} catch (e) {
						// JSON 파싱 오류 발생 시 원본 값으로 처리
						updateSessionData(value, key, this);
					}
				}

				function updateSessionData(parsedValue, key, _this){
					// 배열에서 특정 cnt 값을 찾아서 수정한다
					if (parsedValue.cnt ==  _this.cntS) {
						parsedValue.title = data.title;
						parsedValue.text = data.text;
						parsedValue.name = data.user;
						parsedValue.time = nowTime;

						sessionStorage.setItem(key, JSON.stringify(parsedValue));
					}
				}
    		});
		}
	  
	  reloadGrid(this);
  	});
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
		console.log('value : ' + value);
        
       	// 세션에 저장된 값이 빈 문자열이 아니면
		if (value && value.trim() !== '') {
			try {
				// JSON 파싱
				const parsedValue = JSON.parse(value);
				updateSessionData(parsedValue, key, this);
			} catch (e) {
				// JSON 파싱 오류 발생 시 원본 값으로 처리
				updateSessionData(value, key, this);
			}
		}
		
	function updateSessionData(parsedValue, key, _this){
			// 배열에서 특정 cnt 값을 찾아서 수정한다
			if (parsedValue.cnt ==  _this.cntS) {
				parsedValue.title = _this.edit_title.getText();
				parsedValue.text = _this.edit_text.getText();
				parsedValue.name = _this.edit_user.getText();
				parsedValue.time = nowTime;

				sessionStorage.setItem(key, JSON.stringify(parsedValue));
			}
		}
    });
    location.reload(); // 캐시된 페이지를 로딩
};

MainView.prototype.click_seartch_button = function(comp, info, e) {
    sessionStorage.setItem("select_list", this.select_list.getSelectedItemValue());
    sessionStorage.setItem("searchKeyword", this.search.getText());
   	reloadGrid(this);
};

MainView.prototype.click_reset_button = function(comp, info, e){
	reloadGrid(this, 't');
};

// 리로드 함수
function reloadGrid (_this, get_searchKeyword){
	let searchKeyword = sessionStorage.getItem("searchKeyword");
    let searchOption = sessionStorage.getItem("select_list");
	if(get_searchKeyword == 't'){
		searchKeyword = '';
	}
	
	
	console.log("searchKeyword : " + searchKeyword, " searchOption : " + searchOption);
	
	_this.main_grid.removeAll();
	
    if (!searchKeyword) { // 검색어가 없다면
		console.log('nk');
        const allData = [];
        // 세션 forEach로 순환
        Object.keys(sessionStorage).forEach(key => {
            if (key !== "searchKeyword" && key !== "select_list" && key !== "cnt") {
                const value = sessionStorage.getItem(key);
				console.log(value);
        
                // JSON 파싱
                const parsedValue = JSON.parse(value);
                allData.push(parsedValue);
            }
        });
        
        allData.sort((a, b) => a.cnt - b.cnt); // 양수면 순서를 바꾸고, 음수면 순서를 그대로
        allData.forEach(item => {
            const data = [
                item.cnt,
                item.title,
                item.text,
                item.name,
                item.time
            ];
			console.log("data : " + data);
			
            _this.main_grid.addRow(data);
        });
        
    } else {
        console.log('ok');
        const allData = [];
        const filteredData = [];
        
        // 세션 forEach로 순환
        Object.keys(sessionStorage).forEach(key => { // 세션에 있는 모든 키를 배열로 가져와서 하나씩 열어봄
            if (key !== "searchKeyword" && key !== "select_list" && key !== "cnt") {
                const value = sessionStorage.getItem(key);
				console.log('value : ', value);

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
            _this.main_grid.addRow(data);
        });
    }
}