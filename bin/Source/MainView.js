
/**
Constructor
Do not call Function in Constructor.
*/
function MainView()
{
	AView.call(this);

	this.cnt = sessionStorage.length+1;
	// 라인 추가(글 복사)
	this.idNum = 1;
	
	this.cntS = 0;
	this.column = 0;

}
afc.extendsClass(MainView, AView);


MainView.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);
	
	const time = new Date();
	const nowTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
	
	
	const allData = [];
	// 세션 forEach로 순환
	Object.keys(sessionStorage).forEach(key => {
		const value = sessionStorage.getItem(key);
		
		// JSON 파싱
		const parsedValue = JSON.parse(value);
		
		allData.push(parsedValue);
	});
		
	allData.sort((a, b) => a.cnt - b.cnt);

	allData.forEach(item => {
		const data = [
			item.cnt,
			item.title,
			item.name,
			item.text,
			item.title
		];

		this.main_grid.addRow(data);
	});


};

MainView.prototype.onInitDone = function()
{
	AView.prototype.onInitDone.call(this);

	//TODO:edit here

};

MainView.prototype.onActiveDone = function(isFirst)
{
	AView.prototype.onActiveDone.call(this, isFirst);

	//TODO:edit here

};

MainView.prototype.click_add_bntX = function(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

MainView.prototype.click_add_cancel = function(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

MainView.prototype.click_write_button = function(comp, info, e)
{

	this.addBox.$ele.css("display", "block");

};

MainView.prototype.click_add_ok = function(comp, info, e)
{	
	// 세션에 값 저장
	const time = new Date();
	const nowTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
	
	let dataList = {
		cnt : this.cnt,
		title : this.add_title.getText(),
		text : this.add_text.getText(),
		name : this.add_user.getText(),
		time : nowTime
	};
	
	sessionStorage.setItem(`dataList${this.cnt}`,JSON.stringify(dataList));
	
	
	
	// 그리드에 추가
	var data = [ this.cnt, this.add_title.getText(), this.add_text.getText(), this.add_user.getText(), nowTime ];
	this.main_grid.addRow(data);
	
	
	
	for (let i=0; i<sessionStorage.length; i++){
		const key = sessionStorage.key(i);
		const value = sessionStorage.getItem(key);
		console.log(`${key}: ${value}`);
	}
	// console.log(JSON.parse(sessionStorage.getItem(`dataList${this.cnt}`)).title);
	
	this.cnt++;
};

MainView.prototype.main_grid_select = function(comp, info, e)
{

	var index = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);
	
	//alert(this.main_grid.getCellText(index, 0));
	
	// 누른 열의 cnt 값
	this.cntS = this.main_grid.getCellText(index, 0);
	this.column = this.main_grid.colIndexOfCell(this.main_grid.getSelectedCells()[0]);
	// alert(this.cntS);
	
	this.edit_title.setText(this.main_grid.getCellText(index, 1));
	this.edit_text.setText(this.main_grid.getCellText(index, 2));
	this.edit_user.setText(this.main_grid.getCellText(index, 3));
	this.editBox.$ele.css("display", "block");

};

MainView.prototype.click_edit_bntX = function(comp, info, e)
{	
	this.editBox.$ele.css("display", "none");
	
};

MainView.prototype.click_edit_delete = function(comp, info, e)
{
	// 배열 제거
	this.main_grid.removeRowSet(this.column);
	
	// 세션 제거
	Object.keys(sessionStorage).forEach(key => {
		const value = sessionStorage.getItem(key);
		const parsedValue = JSON.parse(value);
		
		
		if (parsedValue.cnt == this.cntS){
		sessionStorage.removeItem(key);
		console.log(this.cntS + '삭제');
		}
	});
	
	this.editBox.$ele.css("display", "none");

};

MainView.prototype.click_edit_ok = function(comp, info, e)
{
	
	const time = new Date();
	const nowTime = "! " + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();
	
	// 세션에서 데이터를 가져온다
	Object.keys(sessionStorage).forEach(key => {
		const value = sessionStorage.getItem(key);
		
		// 세션에 저장된 값이 JSOn 문자열일 경우 파싱한다
		const parsedValue = JSON.parse(value);
		
		// 배열에서 특정 cnt 값을 찾아서 수정한다
		if(parsedValue.cnt == this.cntS){
			parsedValue.title = this.edit_title.getText();
			parsedValue.name = this.edit_text.getText();
			parsedValue.text = this.edit_user.getText();
			parsedValue.time = nowTime;
			
			sessionStorage.setItem(key, JSON.stringify(parsedValue));
			
			console.log(`수정 : ${JSON.stringify(parsedValue)}`);
		}
		
	});
	// 캐시된 페이지를 로딩
	location.reload();
};
