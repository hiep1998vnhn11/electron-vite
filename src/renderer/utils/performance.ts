import Timer from './timer'

class Performance {
  startExecute(name = '') {
    const timer = Timer.start()
    const usedJSHeapSize = this.getMemoryInfo().usedJSHeapSize
    return (name2 = '') => {
      const executeTime = timer.stop()
      const endMemoryInfo = this.getMemoryInfo()
      console.log(
        '%cPerformance%c \n1. Navigation：%c%s%c\n2. Thời gian tiêu tốn: %c%sms%c \n3. Biến động bộ nhớ：%sB \n4. Bộ nhớ được phân bổ： %sMB \n5. Bộ nhớ đã sử dụng：%sMB \n6. Bộ nhớ còn lại： %sMB',
        'padding: 2px 4px 2px 4px; background-color: #4caf50; color: #fff; border-radius: 4px;',
        '',
        'color: #ff6f00',
        `${name} ${name2}`,
        '',
        'color: #ff6f00',
        executeTime,
        '',
        endMemoryInfo.usedJSHeapSize - usedJSHeapSize,
        this.toMBSize(endMemoryInfo.jsHeapSizeLimit),
        this.toMBSize(endMemoryInfo.usedJSHeapSize),
        this.toMBSize(endMemoryInfo.totalJSHeapSize)
      )
    }
  }

  getMemoryInfo() {
    let memoryInfo = <memoryInfo>{}
    if (window.performance && window.performance.memory) {
      memoryInfo = window.performance.memory
    }
    return memoryInfo
  }

  toMBSize(byteSize: number) {
    return (byteSize / (1024 * 1024)).toFixed(1)
  }
}

export default new Performance()
