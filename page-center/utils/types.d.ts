interface bibAttrsType {
	pub_year ?: string;
	author ?: string;
	callno ?: string;
	callNo ?: string;
	isbn ?: string;
	classno ?: string;
	classNo ?: string;
	publisher ?: string;
	eisbn ?: string;
	title ?: string;
}

interface userInfoType {
	uid ?: number;
	instId ?: number;
	userId ?: string;
	password ?: string;
	salt ?: any;
	idCard ?: any;
	idCode ?: string;
	idActivationDate ?: string;
	idExpireDate ?: string;
	idStatus ?: number;
	idStatusDesc ?: string;
	idUpdatedBy ?: any;
	idUpdatedDate ?: any;
	firstName ?: any;
	middleName ?: any;
	lastName ?: any;
	displayName ?: string;
	preferredLanguage ?: any;
	preferredLanguageDesc ?: any;
	gender ?: number;
	genderDesc ?: string;
	birthday ?: string;
	nation ?: any;
	dept ?: string;
	occupation ?: string;
	duty ?: any;
	jobPost ?: any;
	education ?: string;
	address ?: string;
	phone ?: any;
	email ?: any;
	mobile ?: string;
	userType ?: string;
	userGroup ?: string;
	userGroupDesc ?: string;
	jobCatalogDesc ?: any;
	jobCatalog ?: any;
	jobGroupDesc ?: any;
	jobGroup ?: any;
	department ?: string;
	grade ?: string;
	isRoot ?: number;
	isCheckedEmail ?: number;
	isLoginRestrict ?: number;
	isLoginRestrictDesc ?: any;
	regDate ?: string;
	logoutDate ?: any;
	expireDate ?: string;
	isNeedEditpwd ?: number;
	isNeedEditpwdDesc ?: any;
	isLoginLimit ?: number;
	isLoginLimitDesc ?: any;
	isIpopen ?: number;
	obligate ?: number;
	deposit ?: number;
	serviceCharge ?: number;
	voucher ?: number;
	credit ?: number;
	userStatus ?: number;
	userClass ?: string;
	userCountry ?: any;
	userStatusDesc ?: string;
	catalogLevel ?: number;
	loginLimitTime ?: any;
	libCode ?: string;
	libPath ?: string;
	loginNum ?: number;
	note ?: any;
	lastLoginTime ?: any;
	statusUpdatedBy ?: any;
	statusUpdatedDate ?: any;
	createdBy ?: any;
	createdDate ?: string;
	updatedBy ?: string;
	updatedDate ?: string;
	circLevel ?: any;
	userRoles ?: any;
	userIdentifiers ?: any;
	userExinfos ?: any;
	photoName ?: any;
	loanedCount ?: number;
	maxLoanCount ?: number;
	userTypeDesc ?: any;
	catalogLevelDesc ?: any;
	libCodeDesc ?: string;
	userOperations ?: any;
	userTypes ?: any;
	userTypesDesc ?: any;
	circLevelDesc ?: any;
	userLocations ?: any;
}

interface bibType {
	bibId ?: number;
	bibNo ?: string;
	muid ?: any;
	isCkb ?: number;
	ckbInfo ?: any;
	bibType ?: string;
	bibFormat ?: string;
	bibLevel ?: number;
	docType ?: string;
	langCode ?: string;
	langCodeDesc ?: any;
	countryCode ?: string;
	countryCodeDesc ?: any;
	bibAttrs ?: string;
	groupId ?: string;
	bibStatus ?: number;
	isOpen ?: number;
	statusUpdatedBy ?: string;
	statusUpdatedDate ?: any;
	createdBy ?: string;
	createdDate ?: string;
	updatedBy ?: string;
	updatedDate ?: any;
	bibData ?: any;
	bibColumns ?: any;
	bibDiscipline ?: any;
	bibIndexData ?: any;
	bibDbindexList ?: any;
	orderDetlList ?: any;
	callNumberList ?: any;
	periItemList ?: any;
	batchBibDetls ?: any;
	holdings ?: any;
	items ?: any;
	recordsetDetls ?: any;
	bibThumbs ?: any;
	portfolios ?: any;
	digitals ?: any;
	bibStat ?: any;
	bibStatusDesc ?: any;
	docTypeDesc ?: any;
	bibTypeDesc ?: any;
	bibFormatDesc ?: any;
	bibBean ?: any;
}

// 书籍详情
/* 当前借阅，即将到期，借阅历史 三种item的类型合并到一起 */
export interface bookInfoType {
	bibId ?: string | number;
	bibAttrs ?: bibAttrsType;
	loanTypeDesc ?: string;
	loanType ?: any;
	author ?: string;
	dueDate ?: string;
	title ?: string;
	barCode ?: string;
	attachment ?: any;
	loanDate ?: string;
	location ?: string;
	loanId ?: string;
	returnDate ?: string;
	uid ?: number;
	itemId ?: number;
	periId ?: any;
	lossRecoupDate ?: any;
	renewTimes ?: number;
	renewLatestDate ?: string;
	asbackTimes ?: number;
	asbackLatestDate ?: any;
	proxyUserId ?: any;
	circRuleCode ?: string;
	instId ?: number;
	libCode ?: string;
	locaCode ?: string;
	itemLibCode ?: string;
	itemLibCodeDesc ?: any;
	itemLocaCode ?: string;
	itemLocaCodeDesc ?: any;
	loanedBy ?: string;
	pdaFlag ?: number;
	renewCount ?: number;
	item ?: {
		itemId ?: number;
		holdingId ?: any;
		callNoId ?: number;
		bibId ?: number | string;
		checkId ?: number;
		bindId ?: any;
		handBatchId ?: number;
		handBatchNo ?: any;
		checkBatchId ?: number;
		checkBatchNo ?: any;
		checkDate ?: string;
		recallBatchId ?: any;
		recallBatchNo ?: any;
		fundId ?: number;
		fundIdDesc ?: any;
		propNo ?: string;
		barCode ?: string;
		callNo ?: string;
		callNoPrefix ?: any;
		callNoFormat ?: any;
		asordNo ?: string;
		acqMethod ?: string;
		acqMethodDesc ?: any;
		carrierType ?: string;
		carrierTypeDesc ?: string;
		shelfMark ?: any;
		shelfPath ?: any;
		isOpen ?: number;
		instId ?: number;
		libCode ?: string;
		libCodeDesc ?: string;
		libPath ?: string;
		locaCode ?: string;
		locaCodeDesc ?: string;
		locaPath ?: string;
		orderLibCode ?: string;
		orderLibCodeDesc ?: any;
		orderLibPath ?: string;
		orderLocaCode ?: string;
		orderLocaPath ?: string;
		tempLibCode ?: string;
		tempLibPath ?: string;
		tempLocaCode ?: string;
		tempLocaCodeDesc ?: string;
		tempLocaPath ?: string;
		price ?: number;
		realPrice ?: number;
		currencyType ?: any;
		currencyPrice ?: number;
		arrivalDate ?: string;
		arrivalYear ?: number;
		arrivalMonth ?: string;
		expectedArrivalDate ?: any;
		yearOfIssue ?: string;
		replacementCost ?: number;
		receivingOperator ?: any;
		itemStatus ?: string;
		enableEditPrice ?: number;
		itemStatusDesc ?: string;
		circStatus ?: number;
		extenStatus ?: number;
		dcBatchId ?: any;
		dcBatchNo ?: any;
		circStatusDesc ?: string;
		latestLoanDate ?: string;
		keepEndDate ?: any;
		dueDate ?: string;
		statusUpdatedBy ?: string;
		statusUpdatedDate ?: string;
		circStatusUpdatedBy ?: any;
		circStatusUpdatedDate ?: any;
		yearCircTimes ?: number;
		totalCircTimes ?: number;
		circRuleCode ?: any;
		donatedDate ?: any;
		donatorId ?: any;
		donaBatchId ?: any;
		donaListId ?: any;
		attachment ?: any;
		year ?: string;
		volume ?: string;
		description ?: any;
		createdBy ?: string;
		createdDate ?: string;
		updatedBy ?: string;
		updatedDate ?: string;
		modifiedBy ?: any;
		modifiedDate ?: any;
		pdaFlag ?: number;
		bib ?: bibType;
		holding ?: any;
		location ?: any;
		checkDetl ?: any;
		batch ?: any;
		checkBatch ?: any;
		callNumber ?: any;
		bindDetl ?: any;
		tempLocation ?: any;
		donateList ?: any;
		recallBatch ?: any;
		bibAttrs ?: bibAttrsType;
		holdingType ?: any;
		orderLocaCodeDesc ?: any;
		relevancePeri ?: any;
		tempBatchId ?: any;
		removable ?: false;
		itemStatusCircStatus ?: string;
	};
	user ?: userInfoType;
	circRule ?: any;
	isOverdue ?: number;
	loanLossRecoup ?: any;
	fine ?: any;
	bib ?: any;
	locaCodeDesc ?: any;
	extraAttrs ?: any;
	//   [k: any]: any;
}