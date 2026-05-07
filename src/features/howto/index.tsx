import Image from 'next/image';

function SectionTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
        {step}
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}

function VideoPlayer({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
      <video
        src={src}
        controls
        playsInline
        className="w-full rounded-xl border shadow-sm"
        style={{ maxHeight: 420 }}
      />
    </div>
  );
}

export default function HowToPage() {
  return (
    <div className="text-gray900 mx-auto flex max-w-4xl flex-col gap-16 pb-20">
      {/* 헤더 */}
      <div className="pt-4 text-center">
        <h1 className="mb-3 text-3xl font-bold">사용 방법 안내</h1>
        <p className="text-muted-foreground text-base">
          PCF SaaS의 주요 기능을 단계별로 확인해보세요.
        </p>
      </div>

      {/* 1. 서비스 소개 */}
      <section className="rounded-2xl border bg-card p-8">
        <SectionTitle step="1" title="서비스 소개" />
        <div className="flex flex-col gap-4">
          <p className="leading-relaxed">
            <strong>PCF SaaS</strong>는 기업의 제품 탄소 발자국(Product Carbon Footprint)을
            체계적으로 관리하고 분석하는 플랫폼입니다.
          </p>
          <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
            {[
              '활동 데이터를 직접 입력하거나 Excel로 일괄 업로드',
              'Scope 1·2·3 기준 배출량 자동 계산 (최신 배출계수 적용)',
              '월별·범주별·배출원별 시각화 대시보드 제공',
              '기업별 데이터 분리 관리',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. 대시보드 */}
      <section className="rounded-2xl border bg-card p-8">
        <SectionTitle step="2" title="대시보드" />
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          업로드된 활동 데이터를 기반으로 총 배출량, 월별 추이, Scope 비율, 배출원 비율을 한눈에
          확인할 수 있습니다. 연도 필터로 원하는 기간을 선택하세요.
        </p>

        <div className="mb-6 overflow-hidden rounded-xl border shadow-sm">
          <Image
            src="/howto/dashboard.png"
            alt="대시보드 화면"
            width={1200}
            height={700}
            className="w-full object-cover"
          />
        </div>

        <VideoPlayer src="/howto/dashboard.mov" label="대시보드 둘러보기" />
      </section>

      {/* 3. 데이터 추가 */}
      <section className="rounded-2xl border bg-card p-8">
        <SectionTitle step="3" title="데이터 추가" />
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          활동 데이터를 추가하는 세 가지 방법을 안내합니다. Excel 일괄 업로드, 낱개 직접 입력,
          추가된 목록 관리 순서로 확인해보세요.
        </p>

        <div className="flex flex-col gap-10">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-semibold">
                Excel 업로드
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Excel 파일(.xlsx, .xls)을 드래그하거나 선택해 여러 데이터를 한 번에 추가합니다.
              <br />
              필수 열: <code className="bg-muted rounded px-1 text-xs">일자(원본)</code>,{' '}
              <code className="bg-muted rounded px-1 text-xs">활동 유형</code>,{' '}
              <code className="bg-muted rounded px-1 text-xs">량</code>,{' '}
              <code className="bg-muted rounded px-1 text-xs">단위</code>
            </p>
            <VideoPlayer src="/howto/excel.mov" label="Excel 파일 업로드" />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-semibold">
                낱개 입력
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              기업, 날짜, 활동 유형, 배출량, 단위를 직접 선택·입력해 데이터를 한 건씩 추가합니다.
            </p>
            <VideoPlayer src="/howto/add.mov" label="낱개 직접 입력" />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-semibold">
                목록 관리 및 업로드
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              추가된 항목을 목록에서 확인하고 불필요한 데이터를 삭제한 뒤, 최종적으로 업로드
              버튼을 눌러 저장합니다.
            </p>
            <VideoPlayer src="/howto/list.mov" label="목록 확인 및 업로드" />
          </div>
        </div>
      </section>
    </div>
  );
}
